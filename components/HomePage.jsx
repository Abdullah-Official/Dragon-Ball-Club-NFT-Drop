import Navbar from "./Navbar";
import NftCard from "./nft/NftCard";
import CreateDrop from "./nft/CreateDrop";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState, useMemo } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useNFTDrop } from "@thirdweb-dev/react";
export default function HomePage() {
  const connectWithMetamask = useMetamask();

  const address = useAddress();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nftDrop = useNFTDrop("0xB5Ca91326227A207a7dA22554BB3498055ca29C1");
  const getNftDrops = async () => {
    const nfts = await nftDrop.getAllUnclaimed();
    const claimedNfts = await nftDrop.getAll();
    setNfts([...nfts, ...claimedNfts]);
    setLoading(false);
  };
  useEffect(() => {
    if (!nftDrop) return;
    getNftDrops();
  }, [nftDrop]);
  console.log(nfts);

  const reloadNfts = () => {
    setLoading(true);
    getNftDrops();
    setLoading(false);
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (arg) => {
    setOpen(arg);
  };

  return (
    <>
      <Navbar connectWallet={connectWithMetamask} address={address} />
      <div>
        <Button onClick={() => toggleDrawer(true)}>Open it!</Button>
        <Drawer
          anchor={"right"}
          open={open}
          variant="persistent"
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
          // style={{ width: 1000 }}
        >
          <Box
            sx={{
              width: "55vw",
              backgroundColor: "#091526",
              height: "100%",
              paddingTop: 2,
              paddingBottom: 6,
            }}
            role="presentation"
            className="sidebar"
          >
            <CreateDrop
              refetchNfts={reloadNfts}
              nftDrop={nftDrop}
              toggleDrawer={toggleDrawer}
            />
          </Box>
        </Drawer>
      </div>
      <div className="container-fluid my-4">
        <div className="row g-4">
          {!loading
            ? nfts.map((v, i) => {
                return (
                  <div
                    key={i}
                    className="col-md-6 col-lg-4 col-sm-6 col-12 d-flex align-items-center justify-content-center"
                  >
                    <NftCard
                      name={v?.metadata?.name || v?.name}
                      timestamp={v?.metadata?.timestamp || v?.timestamp}
                      image={v?.metadata?.image || v?.image}
                      description={v?.metadata?.description || v?.description}
                      owner={v?.owner}
                      connectWithMetamask={connectWithMetamask}
                      address={address}
                      getNftDrops={getNftDrops}
                      nftDrop={nftDrop}
                      price="0.025"
                    />
                  </div>
                );
              })
            : [0, 1, 2]?.map((v, i) => {
                return (
                  <div
                    key={i}
                    className="col-md-4 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-center"
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={250}
                      height={250}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}

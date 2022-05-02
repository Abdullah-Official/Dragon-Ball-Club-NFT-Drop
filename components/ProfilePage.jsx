// import Link from "next/Link";
import { useState, useEffect } from "react";
import { useNFTDrop } from "@thirdweb-dev/react";
import { constantsFunc } from "../lib/constants";
import NftCard from "./nft/NftCard";
import { Skeleton } from "@mui/material";
import Navbar from "./Navbar";

export default function ProfilePage() {
  const { address, contract_address, connectMetamask } = constantsFunc();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nftDrop = useNFTDrop(contract_address);
  async function getOwnedNfts() {
    if (!address) return;
    const res = await nftDrop.getOwned(address);
    setNfts(res);
    setLoading(false);
  }
  console.log(nfts);
  useEffect(() => {
    getOwnedNfts();
  }, [address]);
  return (
    <>
      <Navbar connectWallet={connectMetamask} address={address} />
      <div className="main_container container-fluid">
        <div className="cover_profile">
          <img
            src="https://wallpaperaccess.com/full/494838.jpg"
            className="cover_img"
            alt=""
          />
        </div>
        <div className="profile_pic">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwVNN-xiem-U3x2-d8BZ2fVwALBR5F-XP2qQ&usqp=CAU"
            className="profile_img"
            alt=""
          />
          <h4>Goku</h4>
        </div>
      </div>

      <div className="container" style={{ marginTop: 120 }}>
        <div className="row">
          <div className="col-md-7 col-lg-7 col-sm-12 col-12">
            <h4 className="collection_heading ml-3">NFT Collection</h4>
            <div className="row g-4 my-3">
              {!loading
                ? nfts.map((v, i) => {
                    return (
                      <div
                        key={i}
                        className="col-md-6 col-lg-6 col-12 col-sm-12"
                      >
                        <NftCard
                          name={v?.metadata?.name || v?.name}
                          timestamp={v?.metadata?.timestamp || v?.timestamp}
                          image={v?.metadata?.image || v?.image}
                          description={
                            v?.metadata?.description || v?.description
                          }
                          owner={v?.owner}
                          address={address}
                        />
                      </div>
                    );
                  })
                : [0, 1, 2].map((v, i) => (
                    <div
                      key={i}
                      className="col-md-6 col-lg-6 col-12 col-sm-12 d-flex align-items-center justify-content-center"
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={250}
                        height={250}
                      />
                    </div>
                  ))}
            </div>
          </div>
          <div className="col-md-5 col-lg-5 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  );
}

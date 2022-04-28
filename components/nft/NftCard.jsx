import Link from "next/Link";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useState } from "react";

export default function NftCard({
  name,
  image,
  description,
  price,
  owner,
  connectWithMetamask,
  address,
  getNftDrops,
  nftDrop,
}) {
  const [loading, setLoading] = useState(false);

  const claimDrop = async () => {
    if (!address) {
      connectWithMetamask();
    } else {
      setLoading(true);
      await nftDrop
        .claimTo(address, 1)
        .then((e) => {
          alert("CLAIMED SUCCESSFULLY");

          getNftDrops();
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);

          getNftDrops();
          setLoading(false);
        });
    }
  };

  return (
    <>
      <main>
        <div className="card rounded">
          <img
            src={image}
            alt="image of a 3D cube"
            className="rounded nft-img img-fluid"
            style={{ heigth: 20 }}
          />
          <h2>{name}</h2>
          <p>{description}.</p>
          <div className="inline">
            {price && (
              <p className="crypto">
                <FaEthereum size={20} />
                &nbsp;<span className="mt-5">0.025 ETH</span>
              </p>
            )}
            <p>
              <AiOutlineClockCircle size={20} />
              &nbsp;3 days left
            </p>
          </div>
          {!owner ? (
            <div>
              <button
                disabled={loading ? "true" : ""}
                onClick={claimDrop}
                type="button"
                class="btn btn-primary w-100 mt-4 mb-2 py-2"
              >
                {loading ? "Loading.." : "Claim"}
              </button>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}

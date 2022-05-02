import { useState, useEffect, useRef, useMemo } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { create as ipfsHttpClient } from 'ipfs-http-client'

export default function CreateDrop({ toggleDrawer, nftDrop, refetchNfts }) {
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const fileRef = useRef();
  const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
  const validation = image && description && name;

  async function handleChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setImage(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  const createNewDrop = async () => {
    // if (!nftDropModule) return;
    let metadatas = [];
    metadatas.push({
      name,
      description,
      image,
      timestamp: new Date().toLocaleDateString(),
    });
    if (metadatas?.length) {
      (async () => {
        setCreating(true);
        await nftDrop
          .createBatch(metadatas)
          .then((e) => {
            alert("Successfull");
            setName("");
            setImage("");
            setDescription("");
            toggleDrawer(false);
            refetchNfts();
            setCreating(false);
          })
          .catch((e) => {
            setCreating(true);
            console.log(e);
          });
      })();
    }
  };

  return (
    <>
      <div className="container">
        <div className="row my-3">
          <div className="col-md-8 col-sm-8 col-lg-8 col-12 d-flex justify-content-start align-items-center">
            <h3 style={{ color: "#d7d8d9", fontWeight: "bold" }}>
              Create New NFT Drop
            </h3>
          </div>
          <div className="col-md-4 col-sm-4 col-lg-4 col-12 d-flex justify-content-end align-items-center">
            <ClearOutlinedIcon
              onClick={() => toggleDrawer(false)}
              style={{ color: "white", cursor: "pointer" }}
              fontSize={"medium"}
            />
          </div>
        </div>
        <div className="my-3 mt-4">
          <h5 style={{ color: "#d7d8d9", fontWeight: "bold" }}>Metadata</h5>
          <hr className="divider" />
        </div>
        {/* Form  */}
        <div>
          <div>
            <p className="input-label ml-1 ">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputField"
            />
          </div>
          {image ? (
            <img
              className="my-4"
              style={{ width: 160, height: 160, borderRadius: 8, objectFit: 'cover' }}
              src={image}
            />
          ) : (
            <>
              <input
                ref={fileRef}
                onChange={handleChange}
                type="file"
                style={{ backgroundColor: "red", display: "none" }}
              />
              <div
                onClick={() => fileRef.current.click()}
                htmlFor="icon-button-file"
                className="upload_box my-5"
              >
                <div className="d-flex justify-content-start align-items-center">
                  <FileUploadOutlinedIcon style={{ color: "gray" }} size={22} />
                  <p className="mt-1" style={{ color: "gray" }}>
                    Upload file
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="my-3">
            <p className="input-label ml-1">Description</p>
            <textarea
              rows="4"
              cols="25"
              className="inputField"
              id="multiLineInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-1">
          {creating ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={!validation ? true : false}
              onClick={createNewDrop}
              variant={!validation ? 'contained' : "outlined"}
              endIcon={<AddOutlinedIcon />}
            >
              Create Drop
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

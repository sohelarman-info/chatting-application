import { Button } from "@mui/material";
import React from "react";
import { Cropper } from "react-cropper";
import { IoMdClose } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import "./style.css";
import "cropperjs/dist/cropper.css";
//https://www.npmjs.com/package/react-cropper

const ImageCropper = ({
  image,
  setCropper,
  setImage,
  cropData,
  getCropData,
  loader,
}) => {
  return (
    <div className="cropper-box">
      <div className="upload-header">
        <h4>Upload Your Image</h4>
        <div className="upload-close" onClick={() => setImage()}>
          <IoMdClose />
        </div>
      </div>
      <div className="preview-photo">
        <div className="img-preview"></div>
      </div>
      <div className="image-copprer">
        <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        <div className="upload-button" onClick={getCropData}>
          {loader ? (
            <Button className="upload-btn" variant="contained" disabled>
              <BeatLoader color="#fff" size="20" />
            </Button>
          ) : (
            <Button className="upload-btn" variant="contained">
              Upload
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;

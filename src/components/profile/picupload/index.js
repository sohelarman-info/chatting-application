import React, { useRef } from "react";
import { IoIosImages } from "react-icons/io";
import "./style.css";

const ProfilePicUpload = () => {
  const chooseFile = useRef(null);
  const hanldeUploadProfile = (e) => {
    e.preventDefault();
    console.log(e.target.files);
  };
  return (
    <>
      <div
        className="upload-wrapper"
        onClick={() => chooseFile.current.click()}
      >
        <div className="upload">
          <div className="upload-icon">
            <input
              type="file"
              hidden
              ref={chooseFile}
              onChange={hanldeUploadProfile}
            />
            <IoIosImages />
          </div>
          <div className="upload-text">
            <p>Upload Your Profile Picture</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePicUpload;

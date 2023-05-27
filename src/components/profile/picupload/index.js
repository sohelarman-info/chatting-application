import React, { useRef, useState } from "react";
import { IoIosImages } from "react-icons/io";
import ImageCropper from "../cropper";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import "./style.css";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";
import { Loginuser } from "../../../features/slice/UserSlice";

const ProfilePicUpload = ({ setOpen }) => {
  const auth = getAuth();
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [loader, setLoader] = useState(false);
  const chooseFile = useRef(null);
  const storage = getStorage();
  const user = useSelector((user) => user.loginSlice.login);
  const storageRef = ref(storage, "users/" + user.uid);
  const dispatch = useDispatch();
  const hanldeUploadProfile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setLoader(true);
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            setLoader(false);
            dispatch(Loginuser({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
          });
        });
      });
    }
  };
  return (
    <>
      <div className="upload-wrapper">
        <div className="upload" onClick={() => chooseFile.current.click()}>
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
            <p>Choose Your Profile Picture</p>
          </div>
        </div>

        {image && (
          <ImageCropper
            image={image}
            setCropper={setCropper}
            setImage={setImage}
            cropData={cropData}
            getCropData={getCropData}
            loader={loader}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePicUpload;

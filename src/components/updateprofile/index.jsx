import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { Loginuser } from "../../features/slice/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import { ProfileUpdate } from "../../validation/validation";

const UpdateProfile = () => {
  const auth = getAuth();
  const db = getDatabase();
  const user = useSelector((users) => users.loginSlice.login);
  const currentAuth = auth.currentUser;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [passShow, setPassShow] = useState("password");
  const handleShow = () => {
    if (passShow == "password") {
      setPassShow("text");
    } else {
      setPassShow("password");
    }
  };
  const formik = useFormik({
    initialValues: {
      name: user.displayName,
      email: user.email,
    },
    validationSchema: ProfileUpdate,
    onSubmit: () => {
      setLoader(true);
      updateProfile(currentAuth, {
        displayName: formik.values.name,
      })
        .then(() => {
          updatePassword(currentAuth, formik.values.password);
        })
        .then(() => {
          update(ref(db, "users/" + user.uid), {
            username: currentAuth.displayName,
          }).then(() => {
            dispatch(
              Loginuser({ ...user, displayName: currentAuth.displayName })
            );
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, displayName: currentAuth.displayName })
            );
            setLoader(false);
            toast.success("Update Your Profile", {
              position: "top-center",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
        });
    },
  });
  return (
    <div className="settings-wrapper">
      <div className="settings-area">
        <div className="profile-pic-area">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} />
          ) : (
            <img src="images/profile/avatar.png" alt={user.displayName} />
          )}
        </div>
        <div className="settings-field-area">
          <form onSubmit={formik.handleSubmit}>
            <div className="settings-field">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Name"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                fullWidth
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="update-error-msg">{formik.errors.name}</p>
              ) : null}
            </div>
            <div className="settings-field">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Email"
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                fullWidth
                disabled
              />
            </div>
            <div className="settings-field">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="New Password"
                type={passShow}
                name="password"
                onChange={formik.handleChange}
                fullWidth
              />

              <div className="change-password-eye" onClick={handleShow}>
                {passShow == "password" ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </div>
              {formik.errors.password && formik.touched.password ? (
                <p className="update-error-msg">{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="settings-field">
              {loader ? (
                <Button size="large" fullWidth variant="contained" disabled>
                  <BeatLoader color="#fff" size="20" />
                </Button>
              ) : (
                <Button
                  size="large"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Update
                </Button>
              )}
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateProfile;

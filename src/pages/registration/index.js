import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./style.css";
import { TextField, Button } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import { signUp } from "../../validation/validation";
import { toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Registration = () => {
  const auth = getAuth();
  const [passShow, setPassShow] = useState("password");
  const [loader, setLoader] = useState(false);
  const handleShow = () => {
    if (passShow == "password") {
      setPassShow("text");
    } else {
      setPassShow("password");
    }
  };

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUp,
    onSubmit: () => {
      setLoader(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(() => {
          formik.resetForm();
          setLoader(false);
          toast.success("🦄 Registration Completed!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            toast.error("Email already in exist!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoader(false);
          }
        });
    },
  });
  return (
    <div className="registration-wrapper">
      <Container fixed>
        <Grid className="registration-box" container spacing={2}>
          <Grid item xs="6">
            <div className="grid-left">
              <div>
                <h3>Get started with easily register</h3>
                <p>Free register and you can enjoy it</p>
              </div>
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="name-field">
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      className="reg-field"
                      type="name"
                      name="fullname"
                      onChange={formik.handleChange}
                      value={formik.values.fullname}
                    />
                    {formik.errors.fullname && (
                      <p className="error-msg">{formik.errors.fullname}</p>
                    )}
                  </div>
                  <div className="email-field">
                    <TextField
                      label="Email"
                      variant="outlined"
                      className="reg-field"
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && (
                      <p className="error-msg">{formik.errors.email}</p>
                    )}
                  </div>
                  <div className="password-field">
                    <TextField
                      label="Password"
                      variant="outlined"
                      className="reg-field"
                      type={passShow}
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password && (
                      <p className="error-msg">{formik.errors.password}</p>
                    )}
                    <div className="password-eye" onClick={handleShow}>
                      {passShow == "password" ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>
                  <div className="password-field">
                    <TextField
                      label="Confirm Password"
                      variant="outlined"
                      className="reg-field"
                      type={passShow}
                      name="confirmpassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmpassword}
                    />
                    {formik.errors.confirmpassword && (
                      <p className="error-msg">
                        {formik.errors.confirmpassword}
                      </p>
                    )}
                  </div>
                  <div className="registration-button">
                    {loader ? (
                      <Button
                        type="submit"
                        className="submit-button"
                        variant="contained"
                        color="primary"
                        disabled
                      >
                        <BeatLoader color="#fff" size="20" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="submit-button"
                        variant="contained"
                        color="primary"
                      >
                        Sign Up
                      </Button>
                    )}
                    <ToastContainer />
                  </div>
                  <div className="login-link">
                    <p>
                      Already have an account ? <a href="#">Sign In</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid item xs="6">
            <div className="grid-right">
              <div className="register-img">
                <picture>
                  <img src="./images/register/register.png" alt="register" />
                </picture>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Registration;

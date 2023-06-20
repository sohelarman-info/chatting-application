import { Button, Container, Grid, TextField } from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "../../validation/validation";
import "./style.css";
import { Loginuser } from "../../features/slice/UserSlice";
import { getDatabase, ref, set } from "firebase/database";

const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [passShow, setPassShow] = useState("password");
  const [loader, setLoader] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShow = () => {
    if (passShow == "password") {
      setPassShow("text");
    } else {
      setPassShow("password");
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signIn,
    onSubmit: () => {
      setLoader(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          if (auth.currentUser.emailVerified == true) {
            formik.resetForm();
            setLoader(false);
            toast.success("Login Success!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/");
            set(ref(db, "online/" + user.uid), {
              userid: user.uid,
              username: user.displayName,
            });
            dispatch(Loginuser(user));
            localStorage.setItem("users", JSON.stringify(user));
          } else {
            setLoader(false);
            toast.error("Your email is not verified!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          if (error.code.includes("auth/user-not-found")) {
            toast.error("User Not Found!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (error.code.includes("auth/wrong-password")) {
            toast.error("Password not macth", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          setLoader(false);
        });
    },
  });

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider).then(({ user }) => {
      dispatch(Loginuser(user));
      localStorage.setItem("users", JSON.stringify(user));
      set(ref(db, "users/" + user.uid), {
        username: user.displayName,
        email: user.email,
      });
      navigate("/");
    });
  };

  return (
    <div className="login-wrapper">
      <Container fixed>
        <Grid className="login-box" container spacing={2}>
          <Grid item xs="6">
            <div className="grid-left">
              <div className="login-avatar">
                <picture>
                  <img src="./images/login/avatar.png" alt="avatar" />
                </picture>
              </div>
              <div className="login-title">
                <h3>Login to your account!</h3>
              </div>
              <div className="social-login">
                <div className="google-login" onClick={handleGoogleAuth}>
                  <div className="google-icon">
                    <picture>
                      <img src="./images/icon/google.png" alt="google-login" />
                    </picture>
                  </div>
                  <div className="google-logtex">
                    <p>Login with Google</p>
                  </div>
                </div>
              </div>
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="email-field">
                    <TextField
                      label="Email"
                      variant="outlined"
                      className="login-field"
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p className="error-msg">{formik.errors.email}</p>
                    ) : null}
                  </div>
                  <div className="password-field">
                    <TextField
                      label="Password"
                      variant="outlined"
                      className="login-field"
                      type={passShow}
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <p className="error-msg">{formik.errors.password}</p>
                    ) : null}
                    <div className="password-eye" onClick={handleShow}>
                      {passShow == "password" ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  </div>
                  <div className="login-button">
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
                        Sign In
                      </Button>
                    )}
                    <ToastContainer />
                  </div>
                  <div className="forgot-link">
                    <Link to="/forgetpassword">Forgot your password?</Link>
                  </div>
                  <div className="signup-link">
                    <p>
                      Already have an account ?{" "}
                      <Link to="/registration">Sign Up</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid item xs="6">
            <div className="grid-right">
              <div className="signin-img">
                <picture>
                  <img src="./images/login/login.png" alt="login" />
                </picture>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;

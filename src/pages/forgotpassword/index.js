import { Button, Container, Grid, TextField } from "@mui/material";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";

const Forget = () => {
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      sendPasswordResetEmail(auth, formik.values.email)
        .then(() => {
          formik.resetForm({ values: "" });
          toast.success("Reset done! Please check your inbox!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
          } else if (error.code.includes("auth/missing-email")) {
            toast.error("Please insert your account email!", {
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
        });
    },
  });
  return (
    <div className="login-wrapper">
      <Container fixed>
        <Grid className="login-box" container spacing={2}>
          <Grid item xs="6">
            <div className="grid-left">
              <div className="login-title">
                <h3>Reset Your Password!</h3>
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
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="login-button">
                    <Button
                      type="submit"
                      className="submit-button"
                      variant="contained"
                      color="primary"
                    >
                      Reset
                    </Button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid item xs="6">
            <div className="grid-right">
              <div className="signin-img">
                <picture>
                  <img src="./images/forgot/forgot.png" alt="login" />
                </picture>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Forget;

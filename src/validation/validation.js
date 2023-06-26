import * as Yup from "yup";

export const signUp = Yup.object({
  fullname: Yup.string()
    .min(3, "Must be 3 characters or up")
    .max(32, "Must be 32 characters or less")
    .required("Fullname must be Required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email must be Required"),

  password: Yup.string()
    .min(5, "Must be 5 characters or up")
    .max(16, "Must be 16 characters or less")
    .required("Password must be Required"),

  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password don't match")
    .required("Confirm password must be required"),
});

export const signIn = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Login email must be Required"),

  password: Yup.string()
    .min(5, "Must be 5 characters or up")
    .max(16, "Must be 16 characters or less")
    .required("Login password must be Required"),
});

export const ProfileUpdate = Yup.object({
  name: Yup.string()
    .min(3, "Must be 3 characters or up")
    .max(32, "Must be 32 characters or less")
    .required("Name must be Required"),

  password: Yup.string()
    .min(5, "Must be 5 characters or up")
    .max(16, "Must be 16 characters or less"),
});

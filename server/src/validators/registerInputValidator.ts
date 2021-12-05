import * as yup from "yup";

export const registerInputValidator = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Write a valid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please write your password")
    .min(8, "Password should be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export type registerInputType = yup.InferType<typeof registerInputValidator>;

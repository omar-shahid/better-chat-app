import * as yup from "yup";

export const loginInputValidator = yup.object({
  email: yup
    .string()
    .email("Write a valid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please write your password")
    .min(8, "Password should be at least 8 characters long"),
});

export type loginInputType = yup.InferType<typeof loginInputValidator>;

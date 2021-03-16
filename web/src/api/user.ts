import axios from "axios";
import { API_URL } from "../types";

const USER_API_URL = `${API_URL}/user`;

type registerInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type loginInputData = Pick<registerInput, "email" | "password">;

export const user = {
  register: (data: registerInput) =>
    axios.post(`${USER_API_URL}/register`, data).then((res) => res.data),

  login: (data: loginInputData) =>
    axios.post(`${USER_API_URL}/login`, data).then((res) => res.data),
};

// asas

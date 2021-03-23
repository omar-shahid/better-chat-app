import axios, { AxiosResponse } from "axios";
import { API_URL, findFriends, User } from "../types";

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
  profile: () =>
    axios
      .get<null, AxiosResponse<{ profile: User }>>(`${USER_API_URL}/profile`)
      .then((res) => res.data),

  logout: () => axios.post(`${USER_API_URL}/logout`).then((res) => res.data),

  findFriends: () =>
    axios
      .get<null, AxiosResponse<findFriends>>(`${USER_API_URL}/friends/find`)
      .then((res) => res.data),
};

// asas

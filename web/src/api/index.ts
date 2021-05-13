/* eslint-disable import/first */
import { AxiosResponse } from "axios";
import { findFriends, RequestList, User } from "../types";
import apiClient from "./apiClient";

const USER_API_URL = `/user`;

type registerInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type loginInputData = Pick<registerInput, "email" | "password">;

export const api = {
  user: {
    register: (data: registerInput) =>
      apiClient.post(`${USER_API_URL}/register`, data).then((res) => res.data),

    login: (data: loginInputData) =>
      apiClient.post(`${USER_API_URL}/login`, data).then((res) => res.data),
    profile: () =>
      apiClient
        .get<null, AxiosResponse<{ profile: User }>>(`${USER_API_URL}/profile`)
        .then((res) => res.data),

    logout: () =>
      apiClient.post(`${USER_API_URL}/logout`).then((res) => res.data),
  },
  friends: {
    findFriends: () =>
      apiClient
        .get<null, AxiosResponse<findFriends>>(`${USER_API_URL}/friends/find`)
        .then((res) => res.data),

    listRequests: () =>
      apiClient
        .get<null, AxiosResponse<RequestList>>(`${USER_API_URL}/requests/list`)
        .then((res) => res.data),

    sendRequest: (id: string) =>
      apiClient
        .post(`${USER_API_URL}/requests/send`, { id })
        .then((res) => res.data),

    acceptRequest: (id: string) =>
      apiClient
        .post(`${USER_API_URL}/requests/accept`, { id })
        .then((res) => res.data),

    listFriends: () =>
      apiClient
        .get<null, AxiosResponse<findFriends>>(`${USER_API_URL}/friends`)
        .then((res) => res.data),
  },
};

import { AxiosResponse } from "axios";
import { registerInput, USER_API_URL, loginInputData } from "../../api";
import apiClient, { secureApiClient } from "../../api/apiClient";
import { User } from "../../types";

export const authAPI = {
  register: (data: registerInput) =>
    apiClient.post(`${USER_API_URL}/register`, data).then((res) => res.data),

  login: (data: loginInputData) =>
    apiClient.post(`${USER_API_URL}/login`, data).then((res) => res.data),
  profile: () =>
    secureApiClient
      .get<null, AxiosResponse<{ profile: User; sid: string }>>(
        `${USER_API_URL}/profile`
      )
      .then((res) => res.data),

  logout: () =>
    secureApiClient.post(`${USER_API_URL}/logout`).then((res) => res.data),
};

import { AxiosResponse } from "axios";
import { USER_API_URL } from "../../api";
import { secureApiClient } from "../../api/apiClient";
import { findFriends, RequestList } from "../../types";

export const friendsAPI = {
  findFriends: () =>
    secureApiClient
      .get<null, AxiosResponse<findFriends>>(`${USER_API_URL}/friends/find`)
      .then((res) => res.data),

  listRequests: () =>
    secureApiClient
      .get<null, AxiosResponse<RequestList>>(`${USER_API_URL}/requests/list`)
      .then((res) => res.data),

  sendRequest: (id: string) =>
    secureApiClient
      .post(`${USER_API_URL}/requests/send`, { id })
      .then((res) => res.data),

  acceptRequest: (id: string) =>
    secureApiClient
      .post(`${USER_API_URL}/requests/accept`, { id })
      .then((res) => res.data),

  rejectRequest: (id: string) =>
    secureApiClient
      .post(`/user/requests/reject`, { id })
      .then((res) => res.data),

  deleteRequest: (id: string) =>
    secureApiClient
      .post(`/user/requests/delete`, { id })
      .then((res) => res.data),

  listFriends: () =>
    secureApiClient
      .get<null, AxiosResponse<findFriends>>(`${USER_API_URL}/friends`)
      .then((res) => res.data),
};

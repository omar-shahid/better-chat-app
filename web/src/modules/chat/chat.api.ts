import { AxiosResponse } from "axios";
import apiClient from "../../api/apiClient";
import { Message } from "../../types";

export const chatAPI = {
  getPrevMessages: (friendUserId: string) =>
    apiClient
      .post<{ friendUserId: string }, AxiosResponse<{ messages: Message[] }>>(
        "/user/messages/prev",
        { friendUserId }
      )
      .then((res) => res.data),
};

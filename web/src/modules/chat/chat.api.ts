import { AxiosResponse } from "axios";
import { secureApiClient } from "../../api/apiClient";
import { Message } from "../../types";

export const chatAPI = {
  getPrevMessages: (friendUserId: string) =>
    secureApiClient
      .post<
        { friendUserId: string },
        AxiosResponse<{ messages: Message[]; roomName: string }>
      >("/user/messages/prev", { friendUserId })
      .then((res) => res.data),
};

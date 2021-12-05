import { AxiosResponse } from "axios";
import apiClient from "../../api/apiClient";
import { Notification } from "../../types";

export const NotificationAPI = {
  getAllNotifications: () => {
    return apiClient
      .get<null, AxiosResponse<{ notifications: Notification[] }>>(
        "/notifications"
      )
      .then((res) => res.data);
  },
};

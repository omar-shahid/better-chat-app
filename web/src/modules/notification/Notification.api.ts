import { AxiosResponse } from "axios";
import { secureApiClient } from "../../api/apiClient";
import { Notification } from "../../types";

export const NotificationAPI = {
  getAllNotifications: () =>
    secureApiClient
      .get<null, AxiosResponse<{ notifications: Notification[] }>>(
        "/notifications"
      )
      .then((res) => res.data),
};

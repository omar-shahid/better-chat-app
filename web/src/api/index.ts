/* eslint-disable import/first */
import { AxiosResponse } from "axios";
import { authAPI } from "../modules/auth/auth.api";
import { chatAPI } from "../modules/chat/chat.api";
import { friendsAPI } from "../modules/friends/Friends.api";
import { NotificationAPI } from "../modules/notification/Notification.api";
import { findFriends, Message, Notification, RequestList } from "../types";
import apiClient from "./apiClient";

export const USER_API_URL = `/user`;

export type registerInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type loginInputData = Pick<registerInput, "email" | "password">;

export const api = {
  auth: authAPI,
  friends: friendsAPI,
  notifications: NotificationAPI,
  chat: chatAPI,
};

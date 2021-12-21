import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationState = {
  id: string;
  to: string;
  isRead: boolean;
  link: string;
  message: string;
}[];

const initialState: NotificationState = [];

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationState[0]>) => {
      state.push(action.payload);
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      return state.filter((notification) => notification.id === action.payload);
    },
    resetNotifications: () => initialState,
    toggleNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.find(
        (notification) => notification.id === action.payload
      );
      if (!notification) return;
      const idx = state.indexOf(notification);
      const newNotif = { ...notification };
      newNotif.isRead = true;
      state[idx] = newNotif;
      return state;
    },
  },
});

export const notificationActions = notificationSlice.actions;

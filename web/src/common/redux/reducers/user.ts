import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  isLoggedIn: boolean;
  name: string;
  email: string;
  id: string;
};

const initialState: UserState = {
  name: "",
  email: "",
  isLoggedIn: false,
  id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (_, action: PayloadAction<UserState>) => action.payload,
    logout: () => initialState,
  },
});

export const userActions = userSlice.actions;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  profile: {
    name: string;
    email: string;
    id: string;
  };
  token: string;
};

const initialState: UserState = {
  profile: {
    name: "",
    email: "",
    id: "",
  },
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setUserProfile: (state, action: PayloadAction<UserState["profile"]>) => {
      state.profile = action.payload;
    },
    logout: () => initialState,
  },
});

export const userActions = userSlice.actions;

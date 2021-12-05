import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingsState = {
  isDarkbg: boolean;
};

const initialState: SettingsState = {
  isDarkbg: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDarkBg: (_, action: PayloadAction<boolean>) => ({
      isDarkbg: action.payload,
    }),
  },
});

export const settingsActions = settingsSlice.actions;

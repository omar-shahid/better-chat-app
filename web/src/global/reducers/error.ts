import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ErrorState = {
  hasError: boolean;
  error: any;
  info: any;
};

const initialState: ErrorState = {
  hasError: false,
  error: null,
  info: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (_, action: PayloadAction<Omit<ErrorState, "hasError">>) => ({
      hasError: true,
      ...action.payload,
    }),
    resetError: () => initialState,
  },
});

export const errorActions = errorSlice.actions;

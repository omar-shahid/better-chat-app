import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { Message } from "../../../types";

export type UserState = Record<string, Message[]>;

const initialState: UserState = {};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ roomName: string; message: Message }>
    ) => {
      const id = state[action.payload.roomName];
      if (!id) {
        state[action.payload.roomName] = [];
      }
      state[action.payload.roomName].push(action.payload.message);
    },
    addRoom(state, action: PayloadAction<string>) {
      state[action.payload] = [];
    },
  },
});

export const chatActions = chatSlice.actions;

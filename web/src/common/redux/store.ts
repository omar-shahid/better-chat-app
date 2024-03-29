import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { __prod__ } from "../utils/constants";
import { chatSlice } from "./reducers/chat";
import { errorSlice } from "./reducers/error";
import { notificationSlice } from "./reducers/notifications";
import { settingsSlice } from "./reducers/settings";
import { userSlice } from "./reducers/user";

const reducers = combineReducers({
  user: userSlice.reducer,
  error: errorSlice.reducer,
  settings: settingsSlice.reducer,
  chat: chatSlice.reducer,
  notifications: notificationSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: ["error"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: !__prod__,
  middleware: [thunk],
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (fn: (store: RootState) => unknown) =>
  useSelector(fn);

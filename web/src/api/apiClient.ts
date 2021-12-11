import axios from "axios";
import { userActions } from "../common/redux/reducers/user";
import { store } from "../common/redux/store";

let base =
  process.env.REACT_APP_PROD_API_URL ??
  process.env.REACT_APP_BACKEND_IP_URL ??
  process.env.REACT_APP_BACKEND_URL;
const API_URL = `${base}/api`;

const apiClient = axios.create({
  baseURL: API_URL,
});

export const secureApiClient = axios.create({
  baseURL: API_URL,
});

secureApiClient.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${store.getState().user.token}`;
  return config;
});
secureApiClient.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(userActions.logout());
    }
    return Promise.reject(err);
  }
);

export default apiClient;

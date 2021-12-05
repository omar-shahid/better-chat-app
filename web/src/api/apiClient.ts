import axios from "axios";
import { userActions } from "../common/redux/reducers/user";
import { store } from "../common/redux/store";

const API_URL = `${
  process.env.REACT_APP_PROD_API_URL ?? process.env.REACT_APP_BACKEND_URL
}/api`;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
apiClient.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(userActions.logout());
    }
    return Promise.reject(err);
  }
);

export const secureApiClient = axios.create({
  headers: {
    authorization: `Bearer ${store.getState().user.token}`,
  },
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

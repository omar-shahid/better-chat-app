import axios from "axios";
import { userActions } from "./../global/reducers/user";
import { store } from "./../global/store";

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

export default apiClient;

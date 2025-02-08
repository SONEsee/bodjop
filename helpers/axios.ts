import Axios from "axios";
import { UserModel } from "@/models";

const axios = Axios.create({
  //Create key VITE_BASE_URL in file .env before development
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 12000000,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (typeof error !== undefined) {
      if (error.hasOwnProperty("response")) {
        const originalRequest = error.config;
        const errorStatusCode = error.response.status;
        if (errorStatusCode === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          //TODO refresh token implementation
          try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken || refreshToken == null) {
              onLogout();
              pushPath("/login");
              return Promise.reject(error);
            }

            const res = await axios.post<UserModel.UserLoginResponse>(
              "/api/v1/users/refreshtoken",
              {
                refresh_token: refreshToken,
              }
            );

            if (res.status === 200) {
              const item = res.data.items;
              localStorage.setItem("token", item.token);
              localStorage.setItem("refresh_token", item.refresh_token);
              localStorage.setItem("user", JSON.stringify(item.user));
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${item.token}`;
              return axios(originalRequest);
            }
          } catch (onErrorRefresh) {
            console.error(onErrorRefresh);
            onLogout();
            pushPath("/login");
            return Promise.reject(error);
          }
        }
      }
    }

    return Promise.reject(error);
  }
);
export default axios;

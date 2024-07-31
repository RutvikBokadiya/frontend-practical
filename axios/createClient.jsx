import axios from "axios";
import { getCookie, removeCookie } from "utils";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_END_POINT,
});

axiosClient.defaults.headers.common = { "Access-Control-Allow-Origin": "*" };

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;
    if (res?.status === 401 || res?.data?.message === "Token Expired") {
      removeCookie("token");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
    console.error("Looks like there was a problem. Status Code:", res?.status);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

export default axiosClient;

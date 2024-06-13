import axios from "axios";

const GetrefreshToken = () => {
  return localStorage.getItem("token");
};

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = GetrefreshToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

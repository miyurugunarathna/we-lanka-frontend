import axios from "axios";

// const url = process.env.REACT_APP_BASE_URL;

const apiInstance = axios.create({
  baseURL: "INVALID_URL",
});

apiInstance.interceptors.request.use(
  (config) => {
    config.baseURL = "https://we-lanka-backend.up.railway.app";
    config.headers = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiInstance;

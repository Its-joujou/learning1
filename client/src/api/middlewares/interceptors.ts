import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import CONSTANTS_COMMON from "../../constants/common";
import CustomApiError from "../../utils/CustomApiError";
const api: AxiosInstance = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data, status } = error.response;

      if (status === 400) {
        throw new CustomApiError("Bad request", data);
      } else if (status === 401) {
        throw new CustomApiError("Unauthorized", data);
      } else if (status === 404) {
        console.log("Not Found:", data);
        throw new CustomApiError("Not Found", data);
      } else if (status === 409) {
        throw new CustomApiError("Conflict", data);
      } else {
        throw new CustomApiError("Request failed with status ${status}", data);
      }
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
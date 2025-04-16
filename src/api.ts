import axios from "axios";
import { toast } from "vue-sonner";

const api = axios.create({
  baseURL: "/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userDetails");
    }
    if (error.response?.status === 403) {
      toast.warning(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;

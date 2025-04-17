import axios from "axios";
import { toast } from "vue-sonner";
import router from "./router";

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
      toast.error(error.response.data.message);
      router.push({ name: "SignIn" });
    }
    if (error.response?.status === 403) {
      toast.warning(error.response.data.message);
    }
    if (error.response?.status === 404) {
      toast.warning(error.response.data.message);
    }
    if (error.response?.status === 500) {
      toast.error("Something went wrong");
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";


const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("admin_token");

    const token = adminToken || userToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

export const logoutUser = () => {
  const wasAdmin = !!localStorage.getItem("admin_token");
  localStorage.removeItem("token");
  localStorage.removeItem("admin_token");
  localStorage.removeItem("graphura_admin");
  window.location.href = wasAdmin ? "/admin/login" : "/login";
};

export default API;

import axios from "axios";


const API = axios.create({
  // baseURL: "/api",
  baseURL: "http://127.0.0.1:4000/api",
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

// export const loginUser = async (data) => {
//   const response = await API.post("/auth/login", data);
//   localStorage.setItem("token", response.data.token);
//   return response.data;
// };

export const loginUser = async (data) => {
  const response = await API.post("/users/login", data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// export const registerUser = async (data) => {
//   const response = await API.post("/auth/register", data);
//   localStorage.setItem("token", response.data.token);
//   return response.data;
// };

export const registerUser = async (data) => {
  const response = await API.post("/users/signup", data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await API.get("/user/dashboard/me");
  return response.data;
};

export const logoutUser = () => {
  
  localStorage.removeItem("token");
  localStorage.removeItem("admin_token");
  window.location.href = "/";
  };

export default API;

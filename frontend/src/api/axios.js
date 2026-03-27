import axios from "axios";


const API = axios.create({
  // baseURL: "/api",
  baseURL: "http://127.0.0.1:4000/api",
});

API.interceptors.request.use(
  (config) => {
    // Check if the user is currently in the admin panel
    const isAdminPanel = window.location.pathname.startsWith("/admin");
    
    // Choose the appropriate token based on the UI context
    const token = isAdminPanel 
      ? (localStorage.getItem("admin_token") || localStorage.getItem("token")) 
      : localStorage.getItem("token");

    if (token) {
      console.log(`Axios Request to ${config.url || ""} | Using ${isAdminPanel ? "Admin" : "User"} Token:`, token.substring(0, 15) + "...");
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
  console.log("loginUser API called with data:", data);
  const response = await API.post("/users/login", data); // ✅ FIX
  console.log("loginUser API response:", response.data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// export const registerUser = async (data) => {
//   const response = await API.post("/auth/register", data);
//   localStorage.setItem("token", response.data.token);
//   return response.data;
// };

export const registerUser = async (data) => {
  console.log("registerUser API called with data:", data);
  const response = await API.post("/users/signup", data); // ✅ FIX
  console.log("registerUser API response:", response.data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await API.get("/users/me");
  return response.data;
};

export const logoutUser = () => {
  
  localStorage.removeItem("token");
  localStorage.removeItem("admin_token");
   window.location.href = "/login";
  };

export default API;

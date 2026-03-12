import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  axios
    .get("/api/user/dashboard/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setUserData(res.data.user);
    })
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/user/login");
    });
}, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7]">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {userData?.name || "User"}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-[#2F2C79] text-white py-2 px-4 rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;

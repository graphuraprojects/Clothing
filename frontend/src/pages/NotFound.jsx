// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-black text-white rounded cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;

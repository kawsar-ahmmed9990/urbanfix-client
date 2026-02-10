import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, authProviderLoading } = useAuth();
  const location = useLocation(); // 🔹 current path

  if (authProviderLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#f1f5e8] dark:bg-gray-900">
        <div className="text-3xl font-bold text-black dark:text-white flex flex-col items-center">
          <p className="mt-2">
            L<span className="inline-block animate-spin">🔄</span>ading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

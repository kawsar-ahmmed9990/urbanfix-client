import React from "react";

import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, authProviderLoading } = useAuth();

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

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return children;
};

export default PublicRoute;

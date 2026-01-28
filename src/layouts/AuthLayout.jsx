import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="max-w-11/12 mx-auto">
      <div className="mt-5">
        <Logo></Logo>
      </div>

      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;

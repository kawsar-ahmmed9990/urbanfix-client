import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to={"/"} className="text-3xl font-bold">
        <span className="text-[#0B3C6F]">Urban</span>
        <span className="text-[#F57C00]">Fix</span>
      </Link>
    </div>
  );
};

export default Logo;

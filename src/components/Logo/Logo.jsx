import React from "react";
import logo from "../../assets/urbanlogo-removebg-preview.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img className="w-14 h-14" src={logo} alt="" />
      <a className="text-xl font-bold">
        <span className="text-[#0B3C6F]">Urban</span>
        <span className="text-[#F57C00]">Fix</span>
      </a>
    </div>
  );
};

export default Logo;

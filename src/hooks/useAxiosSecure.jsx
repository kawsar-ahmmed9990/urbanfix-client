import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  // baseURL: "https://urbanfix-server-side.vercel.app/",
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

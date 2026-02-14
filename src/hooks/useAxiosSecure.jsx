import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  // baseURL: "https://urbanfix-server-side.vercel.app/",
  baseURL: "https://urbanfix-server-side-199l.vercel.app/",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

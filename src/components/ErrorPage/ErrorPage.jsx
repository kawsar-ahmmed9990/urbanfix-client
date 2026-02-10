import React from "react";
import { Link } from "react-router";
import errorPage from "../../assets/error-404.png";

const ErrorPage = () => {
  return (
    <>
      <div className="text-center pb-10 bg-[#f1f5e8]">
        <img className="mx-auto pt-20 pb-10" src={errorPage} alt="" />
        <h1 className="font-semibold text-4xl">Oops, page not found!</h1>
        <h3 className="text-[#627382] mt-2 mb-4">
          The page you are looking for is not available.
        </h3>
        <Link to={"/"}>
          <button className="btn btn-outline px-6 py-3 rounded-lg">
            Go Back!
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;

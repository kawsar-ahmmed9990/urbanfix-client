import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  const handleRegister = (data) => {
    console.log(data);
  };
  return (
    <div className="hero min-h-screen rounded-xl p-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-xl font-bold mx-auto">Registration Form</h1>
          <form action="" onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label font-bold">Email</label>
              <input
                type="email"
                className="input"
                {...register("email")}
                placeholder="Email"
              />
              <div className="relative">
                <label className="label font-bold mb-2">Password</label>
                <input
                  type={show ? "text" : "password"}
                  className="input"
                  {...register("password")}
                  placeholder="Password"
                />
                <span
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="absolute right-7 top-10 z-1"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button className="btn bg-[#0B3C6F] text-white rounded-full mt-4">
                Create Account
              </button>
            </fieldset>
          </form>
          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-gray-400"></div>
            <span className="text-sm text-gray-700">or</span>
            <div className="h-px w-16 bg-gray-400"></div>
          </div>

          <h1 className="font-semibold mx-auto">
            Don’t have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-500 underline hover:text-blue-800"
            >
              Login
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;

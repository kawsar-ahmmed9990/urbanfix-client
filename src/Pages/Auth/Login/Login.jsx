import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userLogin } = useAuth();
  const [show, setShow] = useState(false);

  const handleLogin = (data) => {
    console.log(data);
    userLogin(data.email, data.password)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };
  return (
    <div className="hero min-h-screen rounded-xl p-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-xl font-bold mx-auto">Please Login</h1>
          <form action="" onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label font-bold">Email</label>
              <input
                type="email"
                className="input"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500 font-bold">
                  This field is required
                </span>
              )}
              {/* Password */}
              <div className="relative">
                <label className="label font-bold mb-2">Password</label>
                <input
                  type={show ? "text" : "password"}
                  className="input"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  })}
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500 font-bold">
                    This field is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500 font-bold">
                    Password must be 6 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 font-bold">
                    Password must contain at least 1 uppercase and 1 lowercase
                    letter.
                  </span>
                )}
                <span
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="absolute right-7 top-10 z-1"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button
                // onClick={handleForgetPassword}
                className="link link-hover text-start"
                type="button"
              >
                Forgot password?
              </button>
              <button className="btn bg-[#0B3C6F] text-white rounded-full mt-4">
                Login
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
              to={"/register"}
              className="text-blue-500 underline hover:text-blue-800"
            >
              Register
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

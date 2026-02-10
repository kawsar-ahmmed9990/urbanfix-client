import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useSaveUser from "../../../hooks/useSaveUser";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { userLogin, googleSignin, resetPassword } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useSaveUser();
  const loc = location.state?.from?.pathname || "/";
  const handleLogin = (data) => {
    console.log(data);
    userLogin(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
        });
        navigate(loc, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignin()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
        });
        navigate(loc, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleForgetPassword = () => {
    const email = getValues("email");

    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email first!",
      });
    }

    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Password reset email sent! Please check your inbox.",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error.message,
        });
      });
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
                  Email is required
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
                    Password is required
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
                onClick={handleForgetPassword}
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

          {/* Google Signin */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center justify-center gap-3 bg-gray-200 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

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

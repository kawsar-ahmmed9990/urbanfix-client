import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  // use useForm from react-form-hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { userRegister, googleSignin, updateUserProfile } = useAuth();
  const [show, setShow] = useState(false);

  //   Registration with email password authentication and update profile
  const handleRegister = (data) => {
    // console.log(data);
    const profileImg = data.photo[0];
    userRegister(data.email, data.password)
      .then(() => {
        // store the image in formData
        const formData = new FormData();
        formData.append("image", profileImg);

        // send the photo to store and get url
        const image_API_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
        axios.post(image_API_Url, formData).then((res) => {
          //   console.log(res.data.data.url);
          const userPofile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          //   update the user profile to firebase
          updateUserProfile(userPofile)
            .then(() => console.log("user profile update done"))
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => console.log(error));
  };

  //   Registration with google
  const handleGoogleSignIn = () => {
    googleSignin()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="hero min-h-screen rounded-xl p-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-xl font-bold mx-auto">Registration Form</h1>
          <form action="" onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label font-bold">Name</label>
              <input
                type="text"
                className="input"
                {...register("name", { required: true })}
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 font-bold">Name is required</span>
              )}
              {/* photo  */}
              <label className="label font-bold">Photo</label>
              <input
                type="file"
                className="file-input"
                {...register("photo", { required: true })}
                placeholder="Photo URL"
              />
              {errors.photo?.type === "required" && (
                <span className="text-red-500 font-bold">
                  Photo is required
                </span>
              )}

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
                <label className="label font-bold mb-2 ">Password</label>
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

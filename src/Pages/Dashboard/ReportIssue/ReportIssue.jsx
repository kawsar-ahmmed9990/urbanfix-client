import axios from "axios";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const ReportIssue = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const handleIssueSubmit = async (data) => {
    console.log(data);
    const imageFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    // Upload to imgbb (or any image hosting)
    const image_API_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
    const res = await axios.post(image_API_Url, formData);
    const imageUrl = res.data.data.url;
    const formPayload = {
      ...data,
      photo: imageUrl,
      email: user.email,
    };
    axiosSecure
      .post("/issues", formPayload)
      .then((res) => console.log("after--", res.data));
    reset();
  };
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Report a New Issue
        </h2>
        <form
          onSubmit={handleSubmit(handleIssueSubmit)}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          {/* Title */}
          <input
            type="text"
            {...register("title")}
            placeholder="Title"
            className="border px-3 py-2 rounded w-full "
          />
          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Description"
            className="border px-3 py-2 rounded w-full "
            rows="4"
          ></textarea>
          {/* Category */}
          <select
            {...register("category")}
            className="border px-3 py-2 rounded w-full "
          >
            <option>Select Category</option>
            <option>Streetlight</option>
            <option>Road & Pothole</option>
            <option>Water Leakage</option>
            <option>Garbage & Waste</option>
            <option>Footpath Damage</option>
            <option>Traffic Signa</option>
            <option>Electricity Issue</option>
          </select>
          {/* Upload photo */}
          <input
            type="file"
            className="file-input border border-black px-3 py-2 rounded w-full "
            {...register("photo", { required: true })}
            placeholder="Photo upload"
          />
          {errors.photo?.type === "required" && (
            <span className="text-red-500 font-bold">Photo is required</span>
          )}

          {/* Location */}
          <input
            type="text"
            {...register("location")}
            placeholder="Location"
            className="border px-3 py-2 rounded w-full "
          />
          {/* Email */}
          <input
            type="email"
            value={user.email}
            readOnly
            className="border px-3 py-2 rounded w-full bg-gray-100 "
          />

          <button
            type="submit"
            className="btn bg-[#0B3C6F] font-bold px-4 py-2 rounded-full text-white  transition w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ReportIssue;

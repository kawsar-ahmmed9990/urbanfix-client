import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const AddIssue = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const handleIssueSubmit = async (data) => {
    console.log(data);
    const imageFile = data.photo[0]; // <-- same as register
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
    // reset();
  };
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Issue</h2>
      <form
        onSubmit={handleSubmit(handleIssueSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <input
          type="file"
          className="file-input border border-black px-3 py-2 rounded w-full "
          {...register("photo", { required: true })}
          placeholder="Photo URL"
        />
        {errors.photo?.type === "required" && (
          <span className="text-red-500 font-bold">Photo is required</span>
        )}
        <input
          type="text"
          {...register("title")}
          placeholder="Title"
          className="border px-3 py-2 rounded w-full "
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            {...register("location")}
            placeholder="Location"
            className="border px-3 py-2 rounded w-full "
          />

          <select
            {...register("status")}
            className="border px-3 py-2 rounded w-full "
          >
            <option>Status</option>
            <option>Pending</option>
            <option>In-progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <select
            {...register("priority")}
            className="border px-3 py-2 rounded w-full "
          >
            <option>Priority</option>
            <option>High</option>
            <option>Normal</option>
          </select>
        </div>

        <textarea
          {...register("description")}
          placeholder="Description"
          className="border px-3 py-2 rounded w-full "
          rows="4"
        ></textarea>

        <input
          type="email"
          value={user.email}
          readOnly
          className="border px-3 py-2 rounded w-full bg-gray-100 "
        />

        <button
          type="submit"
          className="btn bg-[#22c55e] font-bold px-4 py-2 rounded-full text-white  transition w-full hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddIssue;

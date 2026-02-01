import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router";

const UpdateIssue = () => {
  const { user } = useAuth();
  const { id } = useParams();
  // const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  // Fetch issue details
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axiosSecure.get(`/issues/${id}`);
        reset(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err);
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id, axiosSecure, reset]);

  const handleUpdateSubmit = async (data) => {
    try {
      let formPayload = { ...data };

      delete formPayload._id;

      delete formPayload.photo;

      // new image uploaded
      if (
        data.photo &&
        data.photo.length > 0 &&
        data.photo[0] instanceof File
      ) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const image_API_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
        const res = await axios.post(image_API_Url, formData);

        formPayload.photo = res.data.data.url;
      }

      await axiosSecure.patch(`/issues/${id}`, formPayload);

      alert("Issue updated successfully!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to update issue.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Issue</h2>
      <form
        onSubmit={handleSubmit(handleUpdateSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          {...register("title")}
          placeholder="Title"
          className="border px-3 py-2 rounded w-full"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="border px-3 py-2 rounded w-full"
          rows="4"
        />
        <select
          {...register("category")}
          className="border px-3 py-2 rounded w-full"
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
        <input
          type="file"
          className="file-input border border-black px-3 py-2 rounded w-full"
          {...register("photo")}
        />
        <input
          type="text"
          {...register("location")}
          placeholder="Location"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="border px-3 py-2 rounded w-full bg-gray-100"
        />
        <button
          type="submit"
          className="btn bg-[#0B3C6F] font-bold px-4 py-2 rounded-full text-white w-full"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateIssue;

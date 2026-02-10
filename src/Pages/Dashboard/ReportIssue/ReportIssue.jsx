import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ReportIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [issueCount, setIssueCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      setUserData(res.data);

      const issuesRes = await axiosSecure.get(`/issues?email=${user.email}`);
      setIssueCount(issuesRes.data.length);
    };
    fetchData();
  }, [user.email, axiosSecure]);

  const handleIssueSubmit = async (data) => {
    try {
      setLoading(true);

      if (!userData.isPremium && issueCount >= 3) {
        Swal.fire({
          icon: "warning",
          title: "Limit Reached",
          text: "Free user limit reached! Please subscribe.",
          confirmButtonText: "Go to Profile",
        }).then(() => {
          navigate("/dashboard/myprofile");
        });
        return;
      }

      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const image_API_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const imageRes = await axios.post(image_API_Url, formData);
      const imageUrl = imageRes.data.data.url;

      const issuePayload = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        photo: imageUrl,
        email: user.email,
        status: "Pending",
        role: "citizen",
        priority: "normal",
      };

      await axiosSecure.post("/issues", issuePayload);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Issue reported successfully",
        confirmButtonText: "OK",
      });

      reset();
      navigate("/dashboard/myissues");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to submit issue",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Report a New Issue
      </h2>

      {!userData.isPremium && issueCount >= 3 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          You have reached your free issue limit.{" "}
          <button
            className="underline text-blue-600"
            onClick={() => navigate("/dashboard/myprofile")}
          >
            Subscribe
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleIssueSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Title"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="border px-3 py-2 rounded w-full"
          rows="4"
        />
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}

        <select
          {...register("category", { required: true })}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select Category</option>
          <option>Streetlight</option>
          <option>Road & Pothole</option>
          <option>Water Leakage</option>
          <option>Garbage & Waste</option>
          <option>Footpath Damage</option>
          <option>Traffic Signal</option>
          <option>Electricity Issue</option>
        </select>
        {errors.category && (
          <span className="text-red-500">Category is required</span>
        )}

        <input
          type="file"
          {...register("photo", { required: true })}
          className="file-input border border-black px-3 py-2 rounded w-full"
        />
        {errors.photo && (
          <span className="text-red-500">Photo is required</span>
        )}

        <input
          type="text"
          {...register("location", { required: true })}
          placeholder="Location"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.location && (
          <span className="text-red-500">Location is required</span>
        )}

        <input
          type="email"
          value={user.email}
          readOnly
          className="border px-3 py-2 rounded w-full bg-gray-100"
        />

        <button
          type="submit"
          disabled={loading || (!userData.isPremium && issueCount >= 3)}
          className="btn bg-[#0B3C6F] font-bold px-4 py-2 rounded-full text-white w-full"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;

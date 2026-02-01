import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, watch } = useForm({
    defaultValues: {
      status: "",
      category: "",
    },
  });

  // watch values
  const status = watch("status");
  const category = watch("category");

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["myIssues", user?.email, status, category],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        // `/issues?email=${user.email}&status=${status}&category=${category}`,
        `/issues?email=${user.email}&status=${status}&category=${encodeURIComponent(category)}`,
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/issues/${id}`);
        refetch();
        Swal.fire("Deleted!", "Your issue has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the issue.", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Issues</h2>
      <h1>{issues.length}</h1>

      {/* Filters */}
      <form className="flex gap-4 mb-6">
        {/* Status */}
        <select {...register("status")} className="select select-bordered">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In-progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Category */}
        <select {...register("category")} className="select select-bordered">
          <option value="">All Categories</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Road & Pothole">Road & Pothole</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Garbage & Waste">Garbage & Waste</option>
          <option value="Footpath Damage">Footpath Damage</option>
          <option value="Traffic Signa">Traffic Signa</option>
          <option value="Electricity Issue">Electricity Issue</option>
        </select>
      </form>

      {/* Issue List */}
      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white shadow-md rounded-lg border p-4 flex gap-4"
          >
            <img
              src={issue.photo}
              alt={issue.title}
              className="w-32 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{issue.title}</h3>
              <p>Status: {issue.status}</p>
              <p>Category: {issue.category}</p>
              <p>Location: {issue.location}</p>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/issuedetail/${issue._id}`}
                className="btn btn-sm btn-info text-white"
              >
                View
              </Link>

              {issue.status === "Pending" && (
                <Link
                  to={`/updateissue/${issue._id}`}
                  className="btn btn-sm btn-warning text-white"
                >
                  Edit
                </Link>
              )}

              <button
                onClick={() => handleDelete(issue._id)}
                className="btn btn-sm bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {issues.length === 0 && (
          <p className="text-center text-gray-500">No issues found.</p>
        )}
      </div>
    </div>
  );
};

export default MyIssues;

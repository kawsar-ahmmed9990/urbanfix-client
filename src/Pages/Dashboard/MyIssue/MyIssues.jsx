import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, watch } = useForm({
    defaultValues: { status: "", category: "" },
  });

  const status = watch("status");
  const category = watch("category");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["myIssues", user?.email, status, category],
    enabled: !!user?.email,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (user?.email) params.append("email", user.email);
      if (status) params.append("status", status.toLowerCase());
      if (category) params.append("category", category);

      const res = await axiosSecure.get(`/issues?${params.toString()}`);
      if (Array.isArray(res.data)) return res.data;
      if (res.data.issues) return res.data.issues;
      return [];
    },
  });

  const issues = data || [];

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/issues/${id}`);
      await refetch();
      Swal.fire("Deleted!", "Your issue has been deleted.", "success");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading issues...</p>;

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-2xl font-bold mb-4">My Issues</h2>
      {/* <h1 className="mb-4">Total: {issues.length}</h1> */}

      {/* Filters */}
      <form className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          {...register("status")}
          className="select select-bordered w-full sm:w-auto"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          {...register("category")}
          className="select select-bordered w-full sm:w-auto"
        >
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

      {/* Issues List */}
      <div className="space-y-4">
        {issues.length === 0 ? (
          <p className="text-center text-gray-500">No issues found.</p>
        ) : (
          issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white shadow-md rounded-lg border p-4
                         flex flex-col sm:flex-row gap-4"
            >
              {issue.photo && (
                <img
                  src={issue.photo}
                  alt={issue.title}
                  className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded"
                />
              )}

              <div className="flex-1">
                <h3 className="font-semibold">{issue.title}</h3>
                <p>Status: {issue.status}</p>
                <p>Category: {issue.category}</p>
                <p>Location: {issue.location}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  to={`/issuedetail/${issue._id}`}
                  className="btn btn-sm btn-info text-white"
                >
                  View
                </Link>

                {issue.status?.toLowerCase() === "pending" && (
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
          ))
        )}
      </div>
    </div>
  );
};

export default MyIssues;

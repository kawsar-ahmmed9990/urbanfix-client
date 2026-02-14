import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const statusFlow = {
  pending: ["In-progress"],
  "In-progress": ["Working"],
  Working: ["Resolved"],
  Resolved: ["Closed"],
  Closed: [],
};

const AssignIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filters, setFilters] = useState({ status: "", priority: "" });

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["assignedIssues", user?.email, filters],
    queryFn: async () => {
      if (!user?.email) return [];
      const params = new URLSearchParams({ assignedStaff: user.email });
      if (filters.status) params.append("status", filters.status);
      if (filters.priority)
        params.append("priority", filters.priority.toLowerCase());

      const res = await axiosSecure.get(`/issues?${params.toString()}`);

      return res.data;
    },
    keepPreviousData: true,
  });

  const handleChangeStatus = async (issueId, newStatus) => {
    try {
      await axiosSecure.patch(`/issues/${issueId}`, {
        status: newStatus,
        timelineEntry: {
          action: `Status changed to ${newStatus} by ${user.name}`,
          date: new Date(),
        },
      });
      refetch();
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Issue status changed to "${newStatus}" successfully!`,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status",
      });
    }
  };

  const sortedIssues = [...issues].sort(
    (a, b) => (b.isBoosted ? 1 : 0) - (a.isBoosted ? 1 : 0),
  );

  return (
    <div className="p-2 sm:p-4 space-y-6">
      <h2 className="text-2xl font-bold">Assigned Issues</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          className="select select-bordered w-full sm:w-auto"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          {Object.keys(statusFlow).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full sm:w-auto"
          value={filters.priority}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, priority: e.target.value }))
          }
        >
          <option value="">All Priority</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <button
          className="btn btn-primary w-full sm:w-auto"
          onClick={() => refetch()}
        >
          Apply Filters
        </button>
      </div>

      {/* Issues Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[700px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Change Status</th>
            </tr>
          </thead>

          <tbody>
            {sortedIssues.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No issues assigned
                </td>
              </tr>
            )}

            {sortedIssues.map((issue, index) => (
              <tr key={issue._id}>
                <td>{index + 1}</td>
                <td className="whitespace-normal">{issue.title}</td>
                <td>{issue.category}</td>
                <td>{issue.status}</td>
                <td>
                  {issue.priority?.toLowerCase() === "high" ? (
                    <span className="badge badge-error">High</span>
                  ) : (
                    <span className="badge badge-ghost">Normal</span>
                  )}
                </td>
                <td>
                  {statusFlow[issue.status]?.length > 0 ? (
                    <select
                      className="select select-sm select-bordered w-full"
                      defaultValue=""
                      onChange={(e) =>
                        handleChangeStatus(issue._id, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {statusFlow[issue.status].map((nextStatus) => (
                        <option key={nextStatus} value={nextStatus}>
                          {nextStatus}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignIssues;

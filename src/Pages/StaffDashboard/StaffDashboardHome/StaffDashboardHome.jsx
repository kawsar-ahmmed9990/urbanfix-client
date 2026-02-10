import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const StaffDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch assigned issues
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["staffAssignedIssues", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/issues?assignedStaff=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading assigned issues...</p>;

  // Stats
  const totalAssigned = issues.length;
  const totalResolved = issues.filter((i) => i.status === "Resolved").length;
  const totalPending = issues.filter((i) => i.status === "Pending").length;

  const today = new Date().toLocaleDateString();
  const todaysTasks = issues.filter(
    (i) =>
      new Date(i.createAt).toLocaleDateString() === today &&
      i.status !== "Resolved",
  );

  // Pie Chart Data
  const statusChartData = [
    { name: "Pending", value: totalPending },
    { name: "Resolved", value: totalResolved },
  ];
  const COLORS = ["#FFBB28", "#00C49F"];

  // Issues Over Time
  const issuesOverTime = issues
    .map((i) => ({ date: new Date(i.createAt).toLocaleDateString() }))
    .reduce((acc, cur) => {
      const existing = acc.find((d) => d.date === cur.date);
      if (existing) existing.value += 1;
      else acc.push({ date: cur.date, value: 1 });
      return acc;
    }, []);

  // Mark issue resolved
  const handleMarkResolved = async (issueId) => {
    try {
      await axiosSecure.patch(`/issues/${issueId}`, { status: "Resolved" });

      // 🔹 Optimistically update cache
      queryClient.setQueryData(["staffAssignedIssues", user.email], (oldData) =>
        oldData.map((issue) =>
          issue._id === issueId ? { ...issue, status: "Resolved" } : issue,
        ),
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: "Issue has been marked as Resolved.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update status",
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Staff Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Assigned Issues</p>
          <p className="text-2xl font-bold">{totalAssigned}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Resolved Issues</p>
          <p className="text-2xl font-bold">{totalResolved}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Pending Issues</p>
          <p className="text-2xl font-bold">{totalPending}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Today's Tasks</p>
          <p className="text-2xl font-bold">{todaysTasks.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Issues by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Issues Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={issuesOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Assigned Issues */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Latest Assigned Issues</h3>
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {issues
                .slice(-5)
                .reverse()
                .map((issue, index) => (
                  <tr key={issue._id}>
                    <td>{index + 1}</td>
                    <td>{issue.title}</td>
                    <td>{issue.status}</td>
                    <td>
                      {issue.priority === "high" ? (
                        <span className="badge badge-error">High</span>
                      ) : (
                        <span className="badge badge-ghost">Normal</span>
                      )}
                    </td>
                    <td>
                      {issue.status !== "Resolved" && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleMarkResolved(issue._id)}
                        >
                          Mark Resolved
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardHome;

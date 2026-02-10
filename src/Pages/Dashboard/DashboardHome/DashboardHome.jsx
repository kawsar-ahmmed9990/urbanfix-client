import React from "react";
import { useQuery } from "@tanstack/react-query";
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
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ---------------- Fetch Issues ----------------
  const { data = [], isLoading } = useQuery({
    queryKey: ["issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user.email}`);
      // backend array or {issues: []}
      if (Array.isArray(res.data)) return res.data;
      if (res.data.issues) return res.data.issues;
      return [];
    },
  });

  const issues = data;

  if (isLoading)
    return <div className="text-center py-20">Loading dashboard...</div>;

  // ---------------- Stats ----------------
  const totalIssues = issues.length;
  const totalPending = issues.filter(
    (i) => i.status?.toLowerCase() === "pending",
  ).length;
  const totalInProgress = issues.filter(
    (i) => i.status?.toLowerCase() === "in-progress",
  ).length;
  const totalResolved = issues.filter(
    (i) => i.status?.toLowerCase() === "resolved",
  ).length;

  // ---------------- Pie chart ----------------
  const statusChartData = [
    { name: "Pending", value: totalPending },
    { name: "In Progress", value: totalInProgress },
    { name: "Resolved", value: totalResolved },
  ];
  const COLORS = ["#FFBB28", "#0088FE", "#00C49F"];

  // ---------------- Line chart ----------------
  const issuesOverTime = issues.reduce((acc, issue) => {
    const date = new Date(issue.createdAt).toLocaleDateString(); // <-- createdAt
    const found = acc.find((d) => d.date === date);
    if (found) found.value += 1;
    else acc.push({ date, value: 1 });
    return acc;
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Issues" value={totalIssues} />
        <StatCard title="Pending" value={totalPending} />
        <StatCard title="In Progress" value={totalInProgress} />
        <StatCard title="Resolved" value={totalResolved} />
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
                {statusChartData.map((_, index) => (
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
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow p-4 rounded text-center">
    <p className="text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardHome;

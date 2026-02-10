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
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: issuesData = [], isLoading: loadingIssues } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const issues = issuesData;

  const { data: paymentsData = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { data: usersData = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (loadingIssues || loadingPayments || loadingUsers) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  const totalIssues = issues.length;
  const totalPending = issues.filter(
    (i) => i.status?.toLowerCase() === "pending",
  ).length;
  const totalResolved = issues.filter(
    (i) => i.status?.toLowerCase() === "resolved",
  ).length;
  const totalRejected = issues.filter(
    (i) => i.status?.toLowerCase() === "rejected",
  ).length;

  const totalPayments = paymentsData.reduce(
    (acc, p) => acc + (p.amount || 0),
    0,
  );

  const statusChartData = [
    { name: "Pending", value: totalPending },
    { name: "Resolved", value: totalResolved },
    { name: "Rejected", value: totalRejected },
  ];
  const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

  const issuesOverTime = issues
    .map((i) => ({
      date: new Date(i.createdAt).toLocaleDateString(),
    }))
    .reduce((acc, cur) => {
      const existing = acc.find((d) => d.date === cur.date);
      if (existing) existing.value += 1;
      else acc.push({ date: cur.date, value: 1 });
      return acc;
    }, []);

  const latestIssues = [...issues]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const latestPayments = [...paymentsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const latestUsers = [...usersData]
    .sort(
      (a, b) =>
        new Date(b.registeredAt || b.createdAt) -
        new Date(a.registeredAt || a.createdAt),
    )
    .slice(0, 5);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Total Issues</p>
          <p className="text-2xl font-bold">{totalIssues}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Pending</p>
          <p className="text-2xl font-bold">{totalPending}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Resolved</p>
          <p className="text-2xl font-bold">{totalResolved}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Rejected</p>
          <p className="text-2xl font-bold">{totalRejected}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Total Payments</p>
          <p className="text-2xl font-bold">${totalPayments}</p>
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Issues"]} />
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

      {/* Latest Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Issues */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Latest Issues</h3>
          <ul className="space-y-1">
            {latestIssues.map((i) => (
              <li key={i._id}>
                {i.title} -{" "}
                <span className="text-sm text-gray-500">{i.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Payments */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Latest Payments</h3>
          <ul className="space-y-1">
            {latestPayments.map((p) => (
              <li key={p._id}>
                ${p.amount} -{" "}
                <span className="text-sm text-gray-500">
                  {new Date(p.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Users */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Latest Users</h3>
          <ul className="space-y-1">
            {latestUsers.map((u) => (
              <li key={u._id}>
                {u.name} -{" "}
                <span className="text-sm text-gray-500">{u.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

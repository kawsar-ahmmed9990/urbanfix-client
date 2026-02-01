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

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all issues
  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  // Fetch payments
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // Compute stats
  const totalIssues = issues.length;
  const totalPending = issues.filter((i) => i.status === "Pending").length;
  const totalInProgress = issues.filter(
    (i) => i.status === "In-progress",
  ).length;
  const totalResolved = issues.filter((i) => i.status === "Resolved").length;
  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);

  // Chart data
  const statusChartData = [
    { name: "Pending", value: totalPending },
    { name: "In Progress", value: totalInProgress },
    { name: "Resolved", value: totalResolved },
  ];

  const COLORS = ["#FFBB28", "#0088FE", "#00C49F"];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

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
          <p className="text-gray-500">In Progress</p>
          <p className="text-2xl font-bold">{totalInProgress}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Resolved</p>
          <p className="text-2xl font-bold">{totalResolved}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <p className="text-gray-500">Total Payments</p>
          <p className="text-2xl font-bold">${totalPayments}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart for Issue Status */}
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
                fill="#8884d8"
                label
              >
                {statusChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Issues Over Time */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Issues Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={issues.map((i) => ({
                date: new Date(i.createAt).toLocaleDateString(),
              }))}
            >
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

export default DashboardHome;

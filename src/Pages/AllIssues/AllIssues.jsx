import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ThumbsUp, ArrowRight } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function AllIssues() {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    category: "",
  });

  const [page, setPage] = useState(1);
  const limit = 6;
  const [total, setTotal] = useState(0);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/issues", {
        params: { ...filters, page, limit },
      });

      const sorted = res.data.issues.sort((a, b) => {
        if (a.isBoosted && !b.isBoosted) return -1;
        if (!a.isBoosted && b.isBoosted) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setIssues(sorted);
      setTotal(res.data.total);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [filters, page]);

  const totalPages = Math.ceil(total / limit);

  const handleUpvote = async (issueId, issueEmail, alreadyUpvoted) => {
    if (!dbUser) return navigate("/login");

    if (dbUser.email === issueEmail) {
      return Swal.fire({
        icon: "warning",
        title: "Cannot Upvote",
        text: "You cannot upvote your own issue.",
      });
    }

    if (alreadyUpvoted) {
      return Swal.fire({
        icon: "info",
        title: "Already Upvoted",
        text: "You have already upvoted this issue.",
      });
    }

    try {
      await axiosSecure.patch(`/issues/upvote/${issueId}`, {
        email: dbUser.email,
      });

      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === issueId
            ? {
                ...issue,
                upvoteCount: issue.upvoteCount + 1,
                upvotes: [...issue.upvotes, dbUser.email],
              }
            : issue,
        ),
      );
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upvote. Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        All Issues
      </h2>

      {/* 🔍 Search & Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          placeholder="Search issue..."
          className="input input-bordered"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          className="select select-bordered"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          className="select select-bordered"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
        </select>

        <select
          className="select select-bordered"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Category</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Garbage & Waste">Garbage & Waste</option>
          <option value="Traffic Signal">Traffic Signal</option>
          <option value="Footpath Damage">Footpath Damage</option>
          <option value="Electricity Issue">Electricity Issue</option>
        </select>
      </div>

      {/* Loader */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-2xl shadow p-4 sm:p-6 hover:shadow-lg transition relative"
          >
            {/* Status & Priority */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  issue.status === "resolved"
                    ? "bg-emerald-500 text-white"
                    : issue.status === "pending"
                      ? "bg-yellow-400 text-white"
                      : "bg-slate-400 text-white"
                }`}
              >
                {issue.status}
              </span>

              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  issue.priority === "high"
                    ? "bg-red-500 text-white"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                {issue.priority === "high" ? "High" : "Normal"}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              {issue.title}
            </h3>

            <p className="text-sm text-slate-600 line-clamp-2 mt-1">
              {issue.description}
            </p>

            <div className="mt-2 text-sm text-slate-500">
              <strong>Category:</strong> {issue.category}
            </div>
            <div className="mt-1 text-sm text-slate-500">
              <strong>Location:</strong> {issue.location}
            </div>

            {issue.photo && (
              <img
                src={issue.photo}
                alt={issue.title}
                className="mt-4 w-full h-32 sm:h-40 object-cover rounded-lg"
              />
            )}

            {/* Actions */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <button
                onClick={() =>
                  handleUpvote(
                    issue._id,
                    issue.email,
                    issue.upvotes?.includes(dbUser?.email),
                  )
                }
                className={`flex items-center justify-center gap-1 px-3 py-1 text-sm font-medium rounded-lg ${
                  issue.upvotes?.includes(dbUser?.email)
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-800 hover:bg-emerald-100"
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                {issue.upvoteCount || 0}
              </button>

              <button
                onClick={() => navigate(`/issuedetail/${issue._id}`)}
                className="flex items-center justify-center gap-1 px-3 py-1 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
              >
                View Details <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Boost Badge */}
            {issue.isBoosted && (
              <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded bg-rose-500 text-white">
                Boosted
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            className={`btn btn-sm ${page === n + 1 && "btn-primary"}`}
            onClick={() => setPage(n + 1)}
          >
            {n + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

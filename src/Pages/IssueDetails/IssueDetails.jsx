import { useEffect, useState } from "react";
import { CheckCircle, Clock, Trash2, Edit2, Star } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, dbUser, dbLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [boosting, setBoosting] = useState(false);

  useEffect(() => {
    if (!dbLoading && !dbUser) return navigate("/login"); // only logged-in users

    axiosSecure
      .get(`/issues/${id}`)
      .then((res) => {
        setIssue(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to fetch issue",
        });
      });
  }, [id, dbUser, dbLoading, navigate, axiosSecure]);

  if (loading || dbLoading)
    return <p className="text-center mt-20">Loading...</p>;
  if (!issue) return <p className="text-center mt-20">Issue not found</p>;

  // ---------------- ACTION HANDLERS ----------------
  const handleDelete = async () => {
    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you really want to delete this issue?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!confirmResult.isConfirmed) return;

    try {
      await axiosSecure.delete(`/issues/${id}`);
      navigate("/"); // redirect after deletion
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Issue deleted successfully",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || "Delete failed",
      });
    }
  };

  const handleBoost = async () => {
    if (issue.isBoosted) return;
    setBoosting(true);
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        email: user.email,
      });
      const sessionUrl = res.data.url;
      window.location.href = sessionUrl; // redirect to Stripe
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Payment initiation failed",
      });
      setBoosting(false);
    }
  };

  const handleEdit = () => navigate(`/updateissue/${id}`);

  const isOwner = dbUser?.email === issue.email;
  const canEdit = isOwner && issue.status.toLowerCase() === "pending";

  return (
    <div className="max-w-5xl mx-auto p-6 py-12 bg-white rounded-3xl shadow-lg mt-12">
      {/* Issue Header */}
      <div className="flex items-center gap-3">
        <CheckCircle
          className={`h-6 w-6 ${
            issue.status.toLowerCase() === "resolved"
              ? "text-emerald-500"
              : "text-yellow-500"
          }`}
        />
        <span className="text-sm font-semibold uppercase">
          {issue.status} {issue.isBoosted && "• Boosted"}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">{issue.title}</h1>
      <p className="mt-2 text-slate-700">{issue.description}</p>

      {/* Metadata */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
        <div>
          <span className="font-semibold">Category:</span> {issue.category}
        </div>
        <div>
          <span className="font-semibold">Location:</span> {issue.location}
        </div>
        <div>
          <span className="font-semibold">Reported by:</span> {issue.email}
        </div>
        {issue.priority && (
          <div>
            <span className="font-semibold">Priority:</span> {issue.priority}
          </div>
        )}
      </div>

      {/* Photo */}
      {issue.photo && (
        <img
          src={issue.photo}
          alt={issue.title}
          className="mt-6 w-full h-96 object-cover rounded-xl shadow"
        />
      )}

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        {canEdit && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition"
          >
            <Edit2 className="h-4 w-4" /> Edit
          </button>
        )}

        {isOwner && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        )}

        {!issue.isBoosted && (
          <button
            onClick={handleBoost}
            disabled={boosting}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-2xl hover:bg-yellow-600 transition"
          >
            <Star className="h-4 w-4" /> Boost Priority
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Timeline</h2>
        <ul className="space-y-3">
          {issue.timeline.map((event, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-slate-400 mt-1" />
              <div>
                <p className="text-slate-700">{event.action}</p>
                <span className="text-slate-400 text-xs">
                  {new Date(event.date).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Assigned Staff */}
      {issue.assignedStaff && (
        <div className="mt-10 bg-slate-50 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Assigned Staff</h2>
          <p>
            <span className="font-semibold">Email:</span> {issue.assignedStaff}
          </p>
        </div>
      )}
    </div>
  );
}

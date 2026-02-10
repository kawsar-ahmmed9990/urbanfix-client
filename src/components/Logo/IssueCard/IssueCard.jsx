import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const IssueCard = ({ issue, setIssues }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleUpvote = async () => {
    if (!user) return navigate("/login");

    try {
      await axiosSecure.patch(`/issues/upvote/${issue._id}`);
      setIssues((prev) =>
        prev.map((i) =>
          i._id === issue._id ? { ...i, upvoteCount: i.upvoteCount + 1 } : i,
        ),
      );
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="card shadow-md">
      <img src={issue.photo} className="h-40 w-full object-cover" />

      <div className="card-body">
        <h3 className="font-bold">{issue.title}</h3>
        <p>{issue.location}</p>

        <div className="flex gap-2 flex-wrap">
          <span className="badge">{issue.category}</span>
          <span className="badge badge-info">{issue.status}</span>
          <span
            className={`badge ${
              issue.priority === "high" ? "badge-error" : "badge-success"
            }`}
          >
            {issue.priority}
          </span>
          {issue.isBoosted && (
            <span className="badge badge-primary">Boosted</span>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={handleUpvote} className="btn btn-outline btn-sm">
            👍 {issue.upvoteCount}
          </button>
          <Link
            to={`/issuedetail/${issue._id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;

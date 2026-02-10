import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function LatestResolvedIssues() {
  const { dbUser, dbLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/issues?status=Resolved&limit=6")
      .then((res) => {
        setIssues(res.data.issues || res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [dbUser, dbLoading, navigate, axiosSecure]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!issues.length)
    return <p className="text-center mt-20">No resolved issues found.</p>;

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Latest Resolved Issues
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Check out the recently resolved public infrastructure issues in your
            city.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white rounded-2xl shadow p-4 sm:p-6 hover:shadow-lg transition relative"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
                <span className="text-xs sm:text-sm font-semibold text-emerald-500 uppercase">
                  Resolved
                </span>
              </div>

              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-slate-900">
                {issue.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                {issue.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-slate-500 text-sm">
                <span>Category:</span>
                <span className="font-medium">{issue.category}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-slate-500 text-sm">
                <span>Location:</span>
                <span className="font-medium">{issue.location}</span>
              </div>

              {issue.photo && (
                <img
                  src={issue.photo}
                  alt={issue.title}
                  className="mt-4 w-full h-32 sm:h-40 object-cover rounded-lg"
                />
              )}

              <button
                onClick={() => navigate(`/issuedetail/${issue._id}`)}
                className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-600 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

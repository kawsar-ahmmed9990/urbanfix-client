import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllIssuesAdmin = () => {
  const [issues, setIssues] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");
  const axiosSecure = useAxiosSecure();

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/issues");
      const issuesArray = Array.isArray(res.data) ? res.data : [];
      const sorted = issuesArray.sort(
        (a, b) => (b.isBoosted ? 1 : 0) - (a.isBoosted ? 1 : 0),
      );
      setIssues(sorted);
    } catch (err) {
      console.error("Failed to fetch issues", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffs = async () => {
    try {
      const res = await axiosSecure.get("/staff");
      setStaffs(res.data);
    } catch (err) {
      console.error("Failed to fetch staffs", err);
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchStaffs();
  }, []);

  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    setSelectedStaff("");
    setModalOpen(true);
  };

  const handleAssignStaff = async () => {
    if (!selectedStaff) {
      await Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please select a staff member",
      });
      return;
    }
    try {
      await axiosSecure.patch(`/issues/assign/${selectedIssue._id}`, {
        staffEmail: selectedStaff,
      });
      await Swal.fire({
        icon: "success",
        title: "Assigned!",
        text: "Staff assigned successfully!",
      });
      setModalOpen(false);
      fetchIssues();
    } catch (err) {
      console.error("Failed to assign staff", err);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Assignment failed!",
      });
    }
  };

  const handleReject = async (issue) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you really want to reject this issue?",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/issues/reject/${issue._id}`);
      await Swal.fire({
        icon: "success",
        title: "Rejected!",
        text: "Issue rejected!",
      });
      fetchIssues();
    } catch (err) {
      console.error("Failed to reject issue", err);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Failed to reject issue",
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading issues...</p>;

  return (
    <div className="px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-5">All Issues</h1>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Staff</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue, index) => (
              <tr key={issue._id}>
                <td>{index + 1}</td>
                <td>{issue.title}</td>
                <td>{issue.category}</td>
                <td>{issue.status}</td>
                <td>
                  {issue.priority?.toLowerCase() === "high" ? (
                    <span className="badge badge-error">High</span>
                  ) : (
                    <span className="badge badge-ghost">Normal</span>
                  )}
                </td>
                <td>{issue.assignedStaff || "N/A"}</td>
                <td className="flex flex-wrap gap-2">
                  {!issue.assignedStaff && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openAssignModal(issue)}
                    >
                      Assign Staff
                    </button>
                  )}

                  {issue.status?.toLowerCase() === "pending" && (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleReject(issue)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {issues.map((issue, index) => (
          <div
            key={issue._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div className="text-sm text-slate-500">#{index + 1}</div>

            <h3 className="font-semibold text-lg">{issue.title}</h3>

            <p className="text-sm">
              <strong>Category:</strong> {issue.category}
            </p>

            <p className="text-sm">
              <strong>Status:</strong> {issue.status}
            </p>

            <p className="text-sm">
              <strong>Priority:</strong>{" "}
              {issue.priority?.toLowerCase() === "high" ? (
                <span className="badge badge-error ml-1">High</span>
              ) : (
                <span className="badge badge-ghost ml-1">Normal</span>
              )}
            </p>

            <p className="text-sm">
              <strong>Assigned Staff:</strong> {issue.assignedStaff || "N/A"}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {!issue.assignedStaff && (
                <button
                  className="btn btn-sm btn-primary w-full"
                  onClick={() => openAssignModal(issue)}
                >
                  Assign Staff
                </button>
              )}

              {issue.status?.toLowerCase() === "pending" && (
                <button
                  className="btn btn-sm btn-error w-full"
                  onClick={() => handleReject(issue)}
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Assign Staff Modal */}
      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-md">
            <h3 className="font-bold text-lg mb-4">Assign Staff</h3>

            <select
              className="select select-bordered w-full mb-4"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffs.map((staff) => (
                <option key={staff._id} value={staff.email}>
                  {staff.name} ({staff.email})
                </option>
              ))}
            </select>

            <div className="modal-action flex flex-col sm:flex-row gap-2">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAssignStaff}>
                Assign
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllIssuesAdmin;

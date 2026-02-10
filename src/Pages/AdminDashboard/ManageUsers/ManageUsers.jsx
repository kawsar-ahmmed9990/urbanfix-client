import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get(`/users?role=citizen`);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (user) => {
    const action = user.isBlocked ? "unblock" : "block";

    // SweetAlert confirmation
    const result = await Swal.fire({
      icon: "warning",
      title: `Are you sure?`,
      text: `Do you really want to ${action} this user?`,
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${action}/${user.email}`);
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: `User has been ${action}ed successfully!`,
      });
      fetchUsers();
    } catch (error) {
      console.error("Action failed", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-5">Manage Users</h1>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}

            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>

                <td>
                  {user.isPremium ? (
                    <span className="badge badge-success">Premium</span>
                  ) : (
                    <span className="badge badge-ghost">Free</span>
                  )}
                </td>

                <td>
                  {user.isBlocked ? (
                    <span className="badge badge-error">Blocked</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleToggleBlock(user)}
                    className={`btn btn-sm ${
                      user.isBlocked ? "btn-success" : "btn-error"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.length === 0 && <p className="text-center">No users found</p>}

        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div className="text-sm text-slate-500">#{index + 1}</div>

            <p className="text-sm">
              <strong>Name:</strong> {user.name || "N/A"}
            </p>

            <p className="text-sm break-all">
              <strong>Email:</strong> {user.email}
            </p>

            <p className="text-sm">
              <strong>Subscription:</strong>{" "}
              {user.isPremium ? (
                <span className="badge badge-success ml-1">Premium</span>
              ) : (
                <span className="badge badge-ghost ml-1">Free</span>
              )}
            </p>

            <p className="text-sm">
              <strong>Status:</strong>{" "}
              {user.isBlocked ? (
                <span className="badge badge-error ml-1">Blocked</span>
              ) : (
                <span className="badge badge-success ml-1">Active</span>
              )}
            </p>

            <button
              onClick={() => handleToggleBlock(user)}
              className={`btn btn-sm w-full ${
                user.isBlocked ? "btn-success" : "btn-error"
              }`}
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;

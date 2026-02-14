import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { userRegister, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchStaffs = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/staff");
      setStaffs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //   formData.append("name", data.name);
  //   formData.append("email", data.email);
  //   formData.append("phone", data.phone || "");
  //   formData.append("password", data.password);

  //   if (data.photo && data.photo[0]) {
  //     formData.append("photo", data.photo[0]);
  //   }

  //   try {
  //     const res = await axiosSecure.post("/staff", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     await Swal.fire({
  //       icon: "success",
  //       title: "Success!",
  //       text: "Staff added successfully!",
  //     });

  //     setOpenModal(false);
  //     reset();
  //     fetchStaffs();
  //   } catch (error) {
  //     console.error(error);
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.response?.data?.message || error.message,
  //     });
  //   }
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("password", data.password);

    if (data.photo && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    try {
      // Send data to backend
      const res = await axiosSecure.post("/staff", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Success alert
      await Swal.fire({
        icon: "success",
        title: "Staff Added!",
        text: res.data.message || "Staff registered successfully!",
      });

      // Close modal and reset form
      setOpenModal(false);
      reset();

      // Refresh staff list
      fetchStaffs();
    } catch (error) {
      console.error(error);

      // Show error from backend
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading staff...</p>;

  return (
    <div className="px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">Manage Staff</h2>
        <button
          className="btn btn-primary w-full sm:w-auto"
          onClick={() => setOpenModal(true)}
        >
          Add Staff
        </button>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr key={staff._id}>
                <td>{index + 1}</td>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.phone || "N/A"}</td>
                <td>
                  <span className="badge badge-info">Staff</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {staffs.map((staff, index) => (
          <div
            key={staff._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div className="text-sm text-slate-500">#{index + 1}</div>

            <p className="text-sm">
              <strong>Name:</strong> {staff.name}
            </p>

            <p className="text-sm">
              <strong>Email:</strong> {staff.email}
            </p>

            <p className="text-sm">
              <strong>Phone:</strong> {staff.phone || "N/A"}
            </p>

            <p className="text-sm">
              <strong>Role:</strong>{" "}
              <span className="badge badge-info ml-1">Staff</span>
            </p>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {openModal && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-md">
            <h3 className="font-bold text-lg mb-4">Add New Staff</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <input
                {...register("phone")}
                placeholder="Phone"
                className="input input-bordered w-full"
              />

              <input
                {...register("photo")}
                type="file"
                className="input input-bordered w-full"
              />
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Temporary Password"
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <div className="modal-action flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  className="btn w-full sm:w-auto"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageStaff;

import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.photo || "");
  const [preview, setPreview] = useState(user?.photo || "");
  const [loading, setLoading] = useState(false);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (photo instanceof File) {
        formData.append("photo", photo);
      }

      const res = await axiosSecure.patch(
        `/users/update/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });

      setUser(res.data); // update user in context
    } catch (err) {
      console.error("Profile update failed", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Profile Image */}
        <div className="flex items-center gap-4">
          <img
            src={preview || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={user?.email}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${loading ? "loading" : ""}`}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

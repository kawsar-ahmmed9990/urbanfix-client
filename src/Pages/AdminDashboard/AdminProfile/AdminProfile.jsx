import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const [password, setPassword] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------------- Fetch current admin profile ----------------
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axiosSecure.get("/users/admin@example.com"); // <-- Change email as needed
        setAdmin(res.data);
      } catch (err) {
        console.error("Failed to fetch admin:", err);
        setMessage("Failed to load admin profile");
      }
    };
    fetchAdmin();
  }, []);

  // ---------------- Handle photo upload ----------------
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
    }
  };

  // ---------------- Handle form submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", admin.name);
      formData.append("email", admin.email);
      if (password) formData.append("password", password);
      if (newPhoto) formData.append("photo", newPhoto);

      const res = await axiosSecure.patch("/users/updateadmin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage("Profile updated successfully!");

        // Update local state
        setAdmin((prev) => ({
          ...prev,
          photo: newPhoto ? URL.createObjectURL(newPhoto) : prev.photo,
        }));

        setNewPhoto(null);
        setPassword("");
      } else {
        setMessage("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={admin.name}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 font-semibold">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Leave empty if no change"
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block mb-1 font-semibold">Photo</label>
          <input type="file" onChange={handlePhotoChange} />
          <div className="mt-2">
            {newPhoto ? (
              <img
                src={URL.createObjectURL(newPhoto)}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : admin.photo ? (
              <img
                src={admin.photo}
                alt="Admin"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : null}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;

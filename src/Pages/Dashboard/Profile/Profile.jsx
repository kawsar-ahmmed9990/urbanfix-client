import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

import SubscribeButton from "../../../components/SubscribeButton/SubscribeButton";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { dbUser, dbLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", photo: null });
  const [preview, setPreview] = useState(null);
  const [updating, setUpdating] = useState(false);
  console.log(dbUser?.role);

  const openModal = () => {
    setFormData({ name: user?.displayName || "", photo: null });
    setPreview(
      user?.photoURL ||
        (dbUser?.photo
          ? `${process.env.REACT_APP_API_URL}/${dbUser.photo}`
          : null),
    );
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, photo: file }));
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      Swal.fire("Error", "Name cannot be empty", "error");
      return;
    }

    try {
      setUpdating(true);

      let photoURL = user.photoURL;
      if (formData.photo) {
        photoURL = preview;
      }

      await updateUserProfile({
        displayName: formData.name,
        photoURL,
      });

      const data = new FormData();
      data.append("name", formData.name);
      if (formData.photo) data.append("photo", formData.photo);
      data.append("email", dbUser.email);

      await axiosSecure.patch(`/users/update`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Profile updated successfully!", "success");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (dbLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!dbUser)
    return <p className="text-center mt-10 text-red-500">User not found</p>;

  const photoUrl =
    user?.photoURL ||
    (dbUser?.photo
      ? `${process.env.REACT_APP_API_URL}/${dbUser.photo}`
      : "/default-avatar.png");

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="flex items-center gap-4 mb-4">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={photoUrl}
          alt="user"
        />
        <div>
          <h1 className="font-semibold text-lg">
            {user?.displayName || "Anonymous User"}
          </h1>
          <p className="text-gray-500">{dbUser.email}</p>
        </div>
      </div>

      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Profile
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">Update Profile</h3>

            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Photo</label>
              <input type="file" name="photo" onChange={handleChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover mt-2"
                />
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
      {dbUser?.role === "citizen" && <SubscribeButton></SubscribeButton>}
    </div>
  );
};

export default Profile;

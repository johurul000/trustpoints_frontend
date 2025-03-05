import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editAdmin } from "../../features/adminAuthSlice";
import AdminLayout from "../components/AdminLayout";

const EditAdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, isLoading, error } = useSelector((state) => state.adminAuth);

  // Pre-fill form with current admin details
  const [formData, setFormData] = useState({
    username: admin?.username || "",
    email: admin?.email || "",
    first_name: admin?.first_name || "",
    last_name: admin?.last_name || "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAdmin({ adminId: admin?.id, formData })).then((result) => {
      if (!result.error) navigate("/admin/settings"); 
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-lightBackground dark:bg-card shadow-lg rounded-lg p-6 border border-lightBorder dark:border-borderGray">
        <h2 className="text-2xl font-semibold text-dark dark:text-white mb-4 text-center font-sans">
          Edit Admin Profile
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-500 text-sm rounded-md p-4 mb-4">
            {typeof error === "object" ? (
              Object.entries(error).map(([key, messages]) => (
                <div key={key} className="mb-2">
                  <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
                  <ul className="ml-4 list-disc">
                    {Array.isArray(messages)
                      ? messages.map((msg, i) => <li key={i}>{msg}</li>)
                      : <li>{messages}</li>}
                  </ul>
                </div>
              ))
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-grayText">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark dark:text-grayText">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark dark:text-grayText">First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark dark:text-grayText">Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-highlight hover:bg-highlightHover text-white font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditAdminProfile;

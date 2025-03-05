import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../features/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const { error, isLoading } = useSelector((state) => state.adminAuth); 


  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdmin({adminData: formData})).then((result) => {
        if (!result.error) navigate("/admin/admins"); 
      });
  };

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto bg-lightBackground dark:bg-card shadow-lg rounded-lg p-6 border border-lightBorder dark:border-borderGray">
        <h2 className="text-2xl font-semibold text-dark dark:text-white mb-4 text-center font-sans">
          Create Admin
        </h2>
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-500 text-sm rounded-md p-4 mb-4">
                {typeof error === "object" ? (
                Object.entries(error).map(([key, messages]) => (
                    <div key={key} className="mb-2">
                    <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
                    <ul className="ml-4 list-disc">
                        {Array.isArray(messages) ? messages.map((msg, i) => <li key={i}>{msg}</li>) : <li>{messages}</li>}
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
              placeholder="Enter username"
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
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark dark:text-grayText">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-lightCard dark:bg-modalBackground border-lightBorder dark:border-borderGray text-dark dark:text-white focus:ring-2 focus:ring-highlight focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-highlight hover:bg-highlightHover text-white font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            disabled={isLoading} 
          >
            {isLoading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateAdmin;

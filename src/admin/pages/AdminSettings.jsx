import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AdminSettings = () => {
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.adminAuth); 

  if (!admin) {
    return (
      <AdminLayout>
        <div className="text-center text-red-500 font-sans">No admin details found.</div>
      </AdminLayout>
    );
  }

    const excludedFields = ["points", "is_admin", "is_superuser", "id"];

    const adminDetails = Object.entries(admin).filter(
    ([key, value]) =>
        value !== null &&
        value !== undefined &&
        !excludedFields.includes(key) 
    );

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-lightBackground dark:bg-card shadow-lg rounded-lg p-6 border border-lightBorder dark:border-borderGray">
        <h2 className="text-2xl font-semibold text-dark dark:text-white mb-4 text-center font-sans">
          Admin Profile
        </h2>

        <div className="space-y-4">
          {adminDetails.map(([key, value]) => (
            <div
              key={key}
              className="bg-lightCard dark:bg-modalBackground p-3 rounded-lg border border-lightBorder dark:border-borderGray"
            >
              <strong className="capitalize text-dark dark:text-white">
                {key.replace(/_/g, " ")}:
              </strong>
              <p className="text-gray-700 dark:text-grayText mt-1">
                {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/admin/edit-profile")}
          className="w-full bg-highlight hover:bg-highlightHover text-white font-semibold px-4 py-2 mt-6 rounded-lg transition-all"
        >
          Edit Profile
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

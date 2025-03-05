import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../../features/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const AllAdmins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins, loading, error } = useSelector((state) => state.adminAuth);

  useEffect(() => {
        dispatch({ type: 'adminAuth/resetAdminError' });
      }, [dispatch]
  );

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-lg text-grayText font-sans">Loading admins...</p>;
  if (error)
    return (
      <div className="text-center text-red-500 font-sans">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-500 text-sm rounded-md p-4 mb-4">
            {typeof error === "object" ? (
              Object.entries(error).map(([key, messages]) => (
                <div key={key} className="mb-2">
                  <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
                  <ul className="ml-4 list-disc">
                    {Array.isArray(messages) ? (
                      messages.map((msg, i) => <li key={i}>{msg}</li>)
                    ) : (
                      <li>{messages}</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}
      </div>
    );

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-lightBackground dark:bg-card shadow-lg rounded-lg p-6 border border-lightBorder dark:border-borderGray">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-dark dark:text-white font-sans">
            All Admins
          </h2>
          <button
            onClick={() => navigate("/admin/add-admin")}
            className="bg-highlight hover:bg-highlightHover text-white font-semibold px-4 py-2 rounded-lg transition-all"
          >
            + Add Admin
          </button>
        </div>

        <ul className="divide-y divide-lightBorder dark:divide-borderGray">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="flex justify-between items-center py-3 px-4 hover:bg-lightCard dark:hover:bg-modalBackground rounded-lg transition-all"
            >
              <div>
                <p className="text-lg font-medium text-dark dark:text-white font-sans">
                  {admin.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-grayText">{admin.email}</p>
              </div>
              <button
                onClick={() => navigate(`/admin/update-other-admin/${admin.id}`)}
                className="bg-secondaryHighlight hover:bg-lightSecondaryHighlight text-white px-4 py-2 rounded-lg transition-all"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AllAdmins;

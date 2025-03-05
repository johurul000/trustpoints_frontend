import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allApps, deleteApp, fetchApps } from "../../features/adminAppSlice"; // Adjust path as needed
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { FiEdit, FiTrash, FiPlusCircle } from "react-icons/fi";

const AdminApps = () => {
  const dispatch = useDispatch();
  const { apps, loading, error } = useSelector(
    (state) => state.adminApps
  );

  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 10;
  const totalPages = Math.ceil(apps.length / appsPerPage);
  const [deleting, setDeleting] = useState(null);


  useEffect(() => {
    dispatch(allApps());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this app?");
    if (!confirmed) return;

    setDeleting(id); 
    await dispatch(deleteApp(id));
    setDeleting(null); 
  };

  const indexOfLastApps = currentPage * appsPerPage;
  const indexOfFirstApps = indexOfLastApps - appsPerPage;
  const currentApps = apps.slice(indexOfFirstApps, indexOfLastApps);

  const nextPage = () => {
    if (currentPage < Math.ceil(apps.length / appsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

  };

  return (
    <AdminLayout>
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-white">Apps</h1>
          <Link
            to="/admin/add_app"
            className="flex items-center gap-2 bg-highlight hover:bg-highlightHover text-white px-4 py-2 rounded-lg transition duration-300"
          >
            <FiPlusCircle size={20} /> Add New App
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading apps...</p>
        ) : error ? (
          <p className="text-red-500">
            Failed to load apps: {error.detail || JSON.stringify(error)}
          </p>
        ) : apps.length === 0 ? (
          <p className="text-gray-500">No apps available yet.</p>
        ) : (
          <div className="bg-lightCard p-4 rounded-lg shadow">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-2 text-left">Icon</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Category</th>
                    <th className="p-2 text-left">Points</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApps.map((app) => (
                    <tr key={app.id} className="border-t">
                      <td className="p-2">
                        <img
                          src={app.app_image}
                          alt={app.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-2">{app.name}</td>
                      <td className="p-2">{app.app_category}</td>
                      <td className="p-2">{app.points}</td>
                      <td className="p-2 flex gap-2">
                        <Link
                          to={`/admin/edit_app/${app.id}`}
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700 transition"
                          onClick={() => handleDelete(app.id)}
                        >
                          <FiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {currentApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
                >
                  <img
                    src={app.app_image}
                    alt={app.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-darkText">{app.name}</h3>
                    <p className="text-gray-500 text-sm">{app.app_category}</p>
                    <p className="text-gray-700 font-medium">Points: {app.points}</p>
                    <div className="flex gap-4 mt-2">
                      <Link
                        to={`/admin/edit_app/${app.id}`}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FiEdit size={20} />
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(app.id)}
                      >
                        <FiTrash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                Previous
              </button>
              <div className="text-sm text-white dark:text-darkText">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(apps.length / appsPerPage)}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === Math.ceil(apps.length / appsPerPage)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                Next
              </button>
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
};


export default AdminApps;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserApps } from "../../features/tasksSlice"; 
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import Layout from "../components/Layout";

const AvailableApps = () => {
    const dispatch = useDispatch();
    const { apps, loading, error } = useSelector((state) => state.tasks);
    
    useEffect(() => {
        dispatch(fetchUserApps());
    }, [dispatch]);

    return (
        <Layout>
          <div className="min-h-screen bg-lightBackground text-dark p-4 dark:bg-dark dark:text-white">
            <h1 className="text-2xl font-semibold mb-4 text-center">Download & Earn</h1>
      
            {loading ? (
              <p className="text-grayText text-center">Loading apps...</p>
            ) : error ? (
              <p className="text-red-500">
                Failed to load apps: {error.detail || JSON.stringify(error)}
              </p>
            ) : apps.length === 0 ? (
              <p className="text-grayText text-center">No apps available at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-lightCard p-4 rounded-2xl shadow-md flex flex-col items-center text-center transition hover:scale-105 dark:bg-card"
                  >
                    <img
                      src={app.app_image}
                      alt={app.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-semibold mt-2">{app.name}</h3>
                    <p className="text-grayText text-sm">{app.app_category}</p>
                    <p className="text-lightHighlight font-bold mt-2 dark:text-highlight">
                      {app.points} Points
                    </p>
                    <Link
                      to={`#`} 
                      className="mt-3 flex items-center gap-2 bg-lightHighlight hover:bg-lightHighlightHover text-white px-4 py-2 rounded-lg transition duration-300 dark:bg-highlight dark:hover:bg-highlightHover"
                    >
                      <FaDownload size={16} /> Download & Earn
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Layout>
      );
      
};

export default AvailableApps;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { fetchUserApps, fetchUserTasks } from "../../features/tasksSlice";
import { FaTasks } from "react-icons/fa";
import Layout from "../components/Layout";

const MyTasks = () => {
  const dispatch = useDispatch();
  const { apps, userTasks, loading, error } = useSelector((state) => state.tasks);
  const [activeTab, setActiveTab] = useState("available");

  useEffect(() => {
    dispatch(fetchUserApps());
    dispatch(fetchUserTasks());
  }, [dispatch]);


  const availableApps = apps.filter((app) => {
    const task = userTasks.find((task) => task.app === app.id);
    return !task || task.status === "rejected"; 
  });

  return (

    <Layout>
        <div className="min-h-screen bg-lightBackground text-dark p-4 dark:bg-dark dark:text-white">
            <h1 className="text-2xl font-semibold mb-4 text-center">My Tasks</h1>

            <div className="flex justify-center space-x-4 mb-6">
                <button
                className={`px-4 py-2 rounded-lg ${
                    activeTab === "available" ? "bg-highlight text-white" : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setActiveTab("available")}
                >
                Available
                </button>
                <button
                className={`px-4 py-2 rounded-lg ${
                    activeTab === "pending" ? "bg-highlight text-white" : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setActiveTab("pending")}
                >
                Submitted
                </button>
            </div>

            {loading ? (
                <p className="text-center text-grayText">Loading tasks...</p>
            ) : error ? (
                    <p className="text-red-500">
                    Failed to load apps: {error.detail || JSON.stringify(error)}
                    </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === "available" &&
                    availableApps.map((app) => (
                    <div key={app.id} className="bg-lightCard p-4 rounded-2xl shadow-md text-center dark:bg-card">
                        <img src={app.app_image} alt={app.name} className="w-16 h-16 object-cover rounded-md mx-auto" />
                        <h3 className="text-lg font-semibold mt-2">{app.name}</h3>
                        <Link to={`/complete-task/${app.id}`}>
                            <button className="mt-3 bg-highlight hover:bg-highlightHover text-white px-4 py-2 rounded-lg transition">
                            Complete Task
                            </button>
                        </Link>
                    </div>
                    ))}

                {activeTab === "pending" &&
                    userTasks.map((task) => (
                    <div key={task.id} className="bg-lightCard p-4 rounded-2xl shadow-md text-center dark:bg-card">
                        <img src={task.app_image} alt={task.app_name} className="w-16 h-16 object-cover rounded-md mx-auto" />
                        <h3 className="text-lg font-semibold mt-2">{task.app_name}</h3>
                        <p className={`mt-1 px-2 py-1 rounded-lg text-sm font-medium ${
                        task.status === "pending" ? "bg-orange-500 text-white" :
                        task.status === "verified" ? "bg-green-500 text-white" :
                        "bg-red-500 text-white"
                        }`}>
                        {task.status}
                        </p>
                        {task.screenshot && (
                        <Link to={`/view-task/${task.id}`}>
                            <button className="mt-2 bg-highlight hover:bg-highlightHover text-white px-4 py-2 rounded-lg transition">
                            View Screenshot
                            </button>
                        </Link>
                        )}
                    </div>
                    ))}
                </div>
            )}
            </div>
    </Layout>
  );
};

export default MyTasks;

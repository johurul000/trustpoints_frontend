import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTasks, rejectTask, verifyTask } from "../../features/adminAppSlice";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";

const VerifyTasks = () => {
  const dispatch = useDispatch();
  const { userTasks, loading, error } = useSelector((state) => state.adminApps);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    dispatch(fetchUserTasks());
  }, [dispatch]);

  const pendingTasks = userTasks.filter((task) => task.status === "pending");
  const verifiedTasks = userTasks.filter((task) => task.status === "verified");
  const rejectedTasks = userTasks.filter((task) => task.status === "rejected");

  const handleVerify = (taskId) => {
    dispatch(verifyTask(taskId));
  };

  const handleReject = (taskId) => {
    dispatch(rejectTask(taskId));
  };

  const getTabClass = (tab) =>
    `px-4 py-2 rounded-lg transition ${
      activeTab === tab ? "bg-highlight text-white" : "bg-gray-300 dark:bg-gray-600"
    }`;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-lightBackground text-dark p-4 dark:bg-dark dark:text-white">
        <h1 className="text-2xl font-semibold mb-4 text-center">Verify Tasks</h1>

        <div className="flex justify-center space-x-4 mb-6">
          <button className={getTabClass("pending")} onClick={() => setActiveTab("pending")}>
            Pending
          </button>
          <button className={getTabClass("verified")} onClick={() => setActiveTab("verified")}>
            Verified
          </button>
          <button className={getTabClass("rejected")} onClick={() => setActiveTab("rejected")}>
            Rejected
          </button>
        </div>

        {loading ? (
          <p className="text-center text-grayText">Loading tasks...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load tasks: {error.detail || JSON.stringify(error)}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === "pending" ? pendingTasks :
              activeTab === "verified" ? verifiedTasks :
              rejectedTasks
            ).map((task) => (
              <div key={task.id} className="bg-lightCard p-4 rounded-2xl shadow-md text-center dark:bg-card">
                <img
                  src={task.app_image}
                  alt={task.app_name}
                  className="w-16 h-16 object-cover rounded-md mx-auto"
                />
                <h3 className="text-lg font-semibold mt-2">{task.app_name}</h3>

                {task.screenshot && (
                  <Link to={`/admin/view-task/${task.id}`}>
                    <button className="mt-2 bg-highlight hover:bg-highlightHover text-white px-4 py-2 rounded-lg transition">
                      View
                    </button>
                  </Link>
                )}

                {activeTab === "pending" && (
                  <div className="flex justify-center space-x-2 mt-3">
                    <button onClick={() => handleVerify(task.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                      Verify
                    </button>
                    <button onClick={() => handleReject(task.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                      Reject
                    </button>
                  </div>
                )}

              
              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default VerifyTasks;

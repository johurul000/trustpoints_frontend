import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskDetails } from "../../features/tasksSlice"; 
import Layout from "../components/Layout";
import FullPageLoader from "../../components/FullPageLoader";

const ViewTask = () => {
  const { taskId } = useParams(); 
  const dispatch = useDispatch();
  const { selectedTask: task, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskDetails(taskId)); 
  }, [dispatch, taskId]);

  if (loading) return <Layout><FullPageLoader/></Layout>;

  if (error) return <Layout><p className="text-red-500">
    Failed to load apps: {error.detail || JSON.stringify(error)}
    </p>
    </Layout>;
  if (!task) return <Layout><p className="text-center text-red-500">Task not found.</p></Layout> ;

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-lightBackground text-dark dark:bg-dark dark:text-white">
        <h1 className="text-2xl font-semibold mb-4 text-center">Task Details</h1>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <img
            src={task.app_image}
            alt={task.app_name}
            className="w-24 h-24 object-cover mx-auto rounded-md"
          />
          <h2 className="text-lg font-semibold mt-2">{task.app_name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{task.status}</p>
        </div>

        {task.screenshot && (
          <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Uploaded Screenshot</h3>
            <img src={task.screenshot} alt="Task Screenshot" className="w-full rounded-md" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ViewTask;

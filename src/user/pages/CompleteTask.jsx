import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { fetchAppDetails, submitTask } from "../../features/tasksSlice"; 
import Layout from "../components/Layout";
import FullPageLoader from "../../components/FullPageLoader";

const CompleteTask = () => {
  const { id: appId } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedApp: app, loading, error } = useSelector((state) => state.tasks);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    console.log('Complete Task of App ID: ', appId)
    dispatch(fetchAppDetails(appId)); 
  }, [dispatch, appId]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);
        setPreview(URL.createObjectURL(uploadedFile));
      }
    },
  });

  // Handle submit
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("app", app.id);
    formData.append("screenshot", file);

    try {
      await dispatch(submitTask(formData)).unwrap();
      navigate("/mytasks"); 
    } catch (err) {
      console.log(err.message || "Task submission failed.");
    }
  };

  if (loading) return <Layout><FullPageLoader/></Layout>;

  if (error) return <p className="text-red-500">
        Failed to load apps: {error.detail || JSON.stringify(error)}
    </p>;

  if (!app) return <p className="text-center text-red-500">App not found.</p>;

  return (
    <Layout>
        <div className="min-h-screen p-6 bg-lightBackground text-dark dark:bg-dark dark:text-white">
            <h1 className="text-2xl font-semibold mb-4 text-center">{app.name}</h1>

            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <img
                src={app.app_image}
                alt={app.name}
                className="w-24 h-24 object-cover mx-auto rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{app.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{app.app_category}</p>
                <p className="text-highlight font-bold mt-2">{app.points} Points</p>
            </div>

            <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Upload Screenshot</h3>

                <div
                {...getRootProps()}
                className="border-2 border-dashed p-6 text-center rounded-lg cursor-pointer"
                >
                <input {...getInputProps()} />
                <p className="text-gray-500">Drag & drop an image here, or click to select</p>
                </div>

                {preview && (
                <div className="mt-4">
                    <img src={preview} alt="Preview" className="w-full rounded-md" />
                </div>
                )}

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <button
                onClick={handleSubmit}
                className="mt-4 bg-highlight hover:bg-highlightHover text-white px-4 py-2 rounded-lg transition w-full"
                >
                Submit Task
                </button>
            </div>
            </div>
    </Layout>
  );
};

export default CompleteTask;

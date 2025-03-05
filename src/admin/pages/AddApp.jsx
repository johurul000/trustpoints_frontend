import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { addApp } from "../../features/adminAppSlice";
import { useNavigate } from "react-router-dom";

const AddApp = () => {
  const [formData, setFormData] = useState({
    name: "",
    app_link: "",
    app_category: "",
    sub_category: "",
    points: "",
    app_image: null,
  });

  const dispatch = useDispatch()

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const loading = useSelector((state) => state.adminApps.loading)
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, app_image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    // Validate image selection
    if (!formData.app_image) {
      setError("Please upload an app icon before submitting.");
      return;
    }
    console.log('form data: ', formData)
  
    try {
      dispatch(addApp(formData))
        .unwrap()
        .then(() => {
          navigate('/admin/apps');
        })
        .catch((error) => {
          console.error('Failed to add app. Please try again:', error);
          setError("Failed to add app. Please try again.");
        });
    } catch (err) {
      setError("Failed to add app. Please try again.");
    }
  
  };

  return (
    <AdminLayout>
      <div className="min-h-screen flex items-center justify-center bg-dark text-white p-6 pt-2">
        <div className="w-full max-w-2xl bg-card p-6 rounded-2xl shadow-lg border border-borderGray">
          <h2 className="text-2xl font-semibold mb-4 text-highlight text-center">Add New App</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex flex-col items-center">
              <label htmlFor="app_image" className="block text-grayText mb-2">App Icon</label>
              <div className="relative w-32 h-32 border border-borderGray rounded-lg overflow-hidden bg-dark flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="App Icon Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-grayText">No Image</span>
                )}
              </div>
              <input
                id="app_image"
                name="app_image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 file:bg-highlight file:text-white file:rounded-lg file:px-4 file:py-2 file:cursor-pointer hidden"
              />
              <label htmlFor="app_image" className="mt-2 cursor-pointer bg-highlight hover:bg-highlightHover text-white px-4 py-2 rounded-lg transition duration-200">
                Upload Image
              </label>
            </div>

            <div>
              <label className="block text-grayText">App Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-dark border border-borderGray focus:outline-none focus:border-highlight"
              />
            </div>

            <div>
              <label className="block text-grayText">App Link (Package Name)</label>
              <input
                type="text"
                name="app_link"
                value={formData.app_link}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-dark border border-borderGray focus:outline-none focus:border-highlight"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-grayText">Category</label>
                <input
                  type="text"
                  name="app_category"
                  value={formData.app_category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-borderGray focus:outline-none focus:border-highlight"
                />
              </div>
              <div>
                <label className="block text-grayText">Sub Category</label>
                <input
                  type="text"
                  name="sub_category"
                  value={formData.sub_category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-borderGray focus:outline-none focus:border-highlight"
                />
              </div>
            </div>

            <div>
              <label className="block text-grayText">Points</label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-dark border border-borderGray focus:outline-none focus:border-highlight"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-highlight hover:bg-highlightHover text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              {loading ? "Adding..." : "Add App"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddApp;

import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <Layout>
        <div className="text-center text-red-500 font-sans">No user details found.</div>
      </Layout>
    );
  }

  const excludedFields = ["is_admin", "is_superuser", "id", "role", "points"];

  const userDetails = Object.entries(user).filter(
    ([key, value]) =>
      value !== null &&
      value !== undefined &&
      !excludedFields.includes(key)
  );

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-lightBackground dark:bg-card shadow-lg rounded-lg p-6 border border-lightBorder dark:border-borderGray">
        
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-xl shadow-md text-center mb-6">
          <h3 className="text-lg font-semibold">Your Points</h3>
          <p className="text-3xl font-bold mt-1">{user.points}</p>
        </div>

        <h2 className="text-2xl font-semibold text-dark dark:text-white mb-4 text-center font-sans">
          Profile
        </h2>

        <div className="space-y-4">
          {userDetails.map(([key, value]) => (
            <div
              key={key}
              className="bg-lightCard dark:bg-modalBackground p-4 rounded-lg border border-lightBorder dark:border-borderGray shadow-sm"
            >
              <strong className="capitalize text-dark dark:text-white block text-sm font-medium">
                {key.replace(/_/g, " ")}
              </strong>
              <p className="text-gray-700 dark:text-grayText mt-1 text-lg">
                {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full bg-highlight hover:bg-highlightHover text-white font-semibold px-4 py-2 mt-6 rounded-lg transition-all"
        >
          Edit Profile
        </button>
      </div>
    </Layout>
  );
};

export default Profile;

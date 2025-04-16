import React from 'react';

const ProfileScreen: React.FC = () => {
  const steps = 7500; // Mocked, to be fetched from backend
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
      <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-gray-900 dark:text-white">Steps Today: {steps}</p>
      </div>
    </div>
  );
};

export default ProfileScreen;

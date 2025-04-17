import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
      <div className="prose max-w-none">
        <p className="text-gray-600">Profile page content will go here.</p>
      </div>
    </div>
  );
};

export default Profile;

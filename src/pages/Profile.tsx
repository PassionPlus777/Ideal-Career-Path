import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../core/config/firebase";

const Profile: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const handleStart = () => {
    navigate("/decision");
  };

  const handlePricePlan = () => {
    navigate("/pricing");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  // Get the first letter of the display name or email for the avatar
  const avatarLetter = (user.displayName || user.email || "U")[0].toUpperCase();
  const displayName = user.displayName || user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center w-full p-8">
        {/* Avatar Circle */}
        <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-white font-semibold">
            {avatarLetter}
          </span>
        </div>

        {/* Greeting */}
        <h1 className="text-2xl font-bold text-indigo-900 mb-2">
          Hi {displayName}!
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Kickstart your journey now!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
          <button
            onClick={handleStart}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Start
          </button>
          <button
            onClick={handlePricePlan}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Price Plan
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

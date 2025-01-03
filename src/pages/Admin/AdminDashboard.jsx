import React from "react";
import Sidebar from "./Sidebar";
import GamesCategoryHeader from "./GamesCategoryHeader";

const AdminDashboard = ({ user }) => {
  return (
    <div className="h-screen flex w-full">
      {/* Dynamic Sidebar */}
      <Sidebar user={user} />

      <div className="flex flex-col w-full">
        {/* Dynamic GamesCategoryHeader */}
        <GamesCategoryHeader user={user} className="w-full" />

        <div className="p-8 bg-gray-100 flex-1">
          {/* Welcome Section */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-4/5 md:w-2/3 lg:w-1/2 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome, {user.username}!</h1>
            <p className="text-lg text-gray-600">
              You are logged in as a <strong className="text-indigo-600">{user.role}</strong>.
            </p>
          </div>

          {/* Menu Buttons Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-4/5 md:w-2/3 lg:w-1/2">
            <div
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-4 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => navigate("/agent/register-user")}
            >
              Registration
            </div>

            <div
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-4 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => navigate("/agent/user-management")}
            >
              User Management
            </div>

            <div
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-4 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => navigate("/agent/transfer")}
            >
              Transfer Action
            </div>

            <div
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-4 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => navigate("/agent/transfer-history")}
            >
              Transfer History
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

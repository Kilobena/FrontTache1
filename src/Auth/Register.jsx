import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import Auth from "../service/Auth";
import { useAuth } from "../providers/AuthContext";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profil, setProfil] = useState({ username: "", password: "", role: "Select Role" });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // success or error
  const auth = new Auth();
  const { user, updateUser } = useAuth();

  const getAvailableRoles = () => {
    if (user?.role === "Owner") {
      return ["Partner", "SuperAgent", "Agent", "User"];
    } else if (user?.role === "Partner") {
      return ["SuperAgent"];
    } else if (user?.role === "SuperAgent") {
      return ["Agent"];
    } else {
      return ["User"];
    }
  };

  const roles = getAvailableRoles();

  const handleRegister = async () => {
    if (!user || !user._id) {
      setMessage("User ID is not available. Please try again.");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }
  
    try {
      // Validate username
      const usernameRegex = /^[a-zA-Z0-9._-]{4,16}$/; // Regular expression for validation
      if (!profil.username || !usernameRegex.test(profil.username)) {
        setMessage(
          "Username must be between 4 and 16 characters, and can only contain letters, numbers, underscores (_), dots (.), and hyphens (-)."
        );
        setModalType("error");
        setIsModalOpen(true);
        return;
      }
  
      // Validate role selection
      if (profil.role === "Select Role") {
        setMessage("Please select a role.");
        setModalType("error");
        setIsModalOpen(true);
        return;
      }
  
      const updatedProfil = {
        ...profil,
        id: user._id, // ID of the currently logged-in user (creator)
      };
  
      console.log("Submitting Profile:", updatedProfil); // Debug log
  
      const response = await auth.registerUser(updatedProfil);
  
      console.log("Register Response:", response); // Debug log
  
      if (response.success && response.status === 201) {
        // Successful registration
        setMessage(response.message || "User registered successfully!");
        setModalType("success");
      } else {
        // Handle backend error responses
        setMessage(response.message || "Error occurred during registration.");
        setModalType("error");
      }
  
      setIsModalOpen(true); // Show the modal
    } catch (error) {
      console.error("Error during user registration:", error); // Debug log
      setMessage("Error registering user. Please try again.");
      setModalType("error");
      setIsModalOpen(true); // Show the modal
    }
  };
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setProfil({ username: "", password: "", role: "Select Role" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full p-6 sm:p-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <header className="bg-[#242424] text-white w-full py-4 text-center">
          <h1 className="text-3xl font-bold">Register User</h1>
        </header>
        <div className="w-full p-6">
          <form>
            {/* Username Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <div className="flex items-center border border-black rounded">
                <input
                  className="ml-2 w-full py-2 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={profil.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="flex items-center border border-black rounded">
                <input
                  className="ml-2 w-full py-2 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={profil.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="ml-2 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} text-xl`} aria-hidden="true"></i>
                </button>
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-black rounded p-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                  name="role"
                  value={profil.role}
                  onChange={handleChange}
                >
                  <option value="Select Role">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Register and Reset Buttons */}
            <div className="flex flex-col space-y-2">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none"
                type="button"
                onClick={handleRegister}
              >
                REGISTER USER
              </button>
              <button
                className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full focus:outline-none"
                type="button"
                onClick={handleReset}
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for showing messages */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg max-w-xs w-full">
            <h2
              className={`text-xl font-bold ${
                modalType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {modalType === "success" ? "Success" : "Error"}
            </h2>
            <p className="text-black">{message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded w-full hover:bg-yellow-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;

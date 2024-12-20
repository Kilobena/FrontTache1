import React, { useState } from "react";
import Auth from "../../service/Auth";
import { useAuth } from "../../providers/AuthContext";
import "font-awesome/css/font-awesome.min.css";
import { FaEye, FaEyeSlash, FaLock, FaUserCircle } from "react-icons/fa";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profil, setProfil] = useState({
    username: "",
    password: "",
    role: "Select Role",
  });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // success or error
  const auth = new Auth();
  const { user } = useAuth();

  // Determine available roles based on logged-in user's role
  const getAvailableRoles = () => {
    if (user?.role === "Owner") {
      return ["Partner", "SuperAgent", "Agent", "User"];
    } else if (user?.role === "Partner") {
      return ["SuperAgent"];
    } else if (user?.role === "SuperAgent") {
      return ["Agent"];
    }
    else if (user?.role === "Agent") {
      return ["User"];
    } 
     else {
      return [];
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
    <div className="w-full sm:p-1">
    <header className="rounded-lg bg-[#474747] text-white w-full p-3">
      <h1 className="text-2xl font-bold">Register User</h1>
    </header>
  <div className="w-full max-w-4xl rounded-lg">
    <div className="w-full pt-5 max-w-lg">
      <form>
        {/* Username Input */}
        <div className="relative">
      <label className="block pb-1 text-md text-[#242424]">Username</label>
      <div className="relative">
        {/* Icon */}
        <span className="absolute inset-y-0 left-0 pt-2 pl-4">
          <FaUserCircle className="text-primary-dark" size={20} />
        </span>
        {/* Input Field */}
        <input
         className="w-full  text-gray-700 rounded-lg pl-12 p-1.5 focus:ring-0 focus:ring-white"
         type="text"
         name="username"
         placeholder="Username"
         value={profil.username}
         onChange={handleChange}
        />
      </div>
    </div>
        <div className="relative">
      <label className="block pb-1 text-md text-[#242424] mt-2">Password</label>
      <div className="relative">
        {/* Input Field */}

        <span className="absolute inset-y-0 left-0 pt-2.5 pl-5">
          <FaLock className="text-primary-dark" size={15} />
        </span>
        {/* Toggle Icon */}
        <input
          type={showPassword ? "text" : "password"}
          className="bg-no-repeat text-gray-700 border-n rounded-lg bg-left appearance-none  -lg p-2 pl-12 text-sm focus:ring-0 focus:ring-white  w-full mb-2 "
          value={profil.password}
          name="password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0  pt-2 right-3">
          {showPassword ? <FaEye className="text-primary-dark" size={24} /> : <FaEyeSlash className="text-primary-dark" size={24} />}
        </span>
      </div>
    </div>
        {/* Role Dropdown */}
        <div className="mb-6">
          <label className="block pb-1 text-md text-[#242424]">Role</label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border focus:ring-0 focus:ring-white border-black rounded p-2 text-gray-700 leading-tight focus:outline-none focus:ring-2  pr-10"
              name="role"
              value={profil.role}
              onChange={handleChange}
            >
              <option value="Select Role">Super Agent</option>
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
            className="bg-[rgb(244,195,43,1)] hover:bg-[#ccaa00] text-black text-sm font-bold p-3.5 rounded-lg w-full focus:outline-none"
            type="button"
            onClick={handleRegister}
          >
            REGISTER USER
          </button>
          <button
            className="border border-black hover:bg-gray-300 text-black font-bold p-3 rounded-lg w-full focus:outline-none"
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

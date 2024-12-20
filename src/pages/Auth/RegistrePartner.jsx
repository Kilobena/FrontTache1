import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import Auth from "../../service/Auth.js";
import { useAuth } from "../../providers/AuthContext";

const RegisterPartner = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profil, setProfil] = useState({
    username: "",
    password: "",
    role: "Partner",
  }); // Role is "Partner" by default
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = new Auth();
  const { user } = useAuth(); // Get current user

  const handleRegister = async () => {
    if (!user || !user._id) {
      console.log("User ID is not available:", user);
      setMessage("User ID is not available. Please try again.");
      setIsModalOpen(true);
      return;
    }

    try {
      const updatedProfil = {
        ...profil,
        id: user._id, // Assign the user's _id here
        role: "Partner", // Ensure role is always "Partner"
      };
      console.log("Profile to register:", updatedProfil); // Log to check the value before sending it

      const response = await auth.registerUser(updatedProfil);

      if (response.status === 201) {
        setMessage("User registered successfully!");
      } else {
        if (response.status === 200) {
          setMessage("User already registered.");
        } else {
          setMessage(response.message);
        }
      }
      setIsModalOpen(true);
    } catch (error) {
      setMessage("Error registering user. Please try again.");
      console.error(error);
      setIsModalOpen(true);
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
    setProfil({ username: "", password: "", role: "Partner" }); // Reset the form with role as "Partner"
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold bg-gray-700 text-white p-4 rounded w-full">
          Register Partner
        </h1>
        <div className="w-full max-w-lg bg-white p-6 rounded">
          <form>
            {/* Username Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <div className="flex items-center border border-black rounded">
                <img
                  src="/images/account-circle.svg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full p-2"
                />
                <input
                  className="ml-2 w-full py-2 text-gray-700 rounded focus:outline-none"
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="flex items-center border border-black rounded">
                <img
                  src="/images/lock.png"
                  alt="Lock"
                  className="w-10 h-10 rounded-full p-2"
                />
                <input
                  className="ml-2 w-full py-2 text-gray-700 rounded focus:outline-none"
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
                  <div className="pr-[8px]">
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      } text-xl`}
                      aria-hidden="true"
                    ></i>
                  </div>
                </button>
              </div>
            </div>

            {/* Register and Reset Buttons */}
            <div className="flex flex-col pb-3">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                type="button"
                onClick={handleRegister}
              >
                REGISTER PARTNER
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
                type="button"
                onClick={handleReset}
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for success/error messages */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">{message}</h2>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPartner;

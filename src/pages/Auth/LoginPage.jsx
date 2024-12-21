import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { FaEye, FaEyeSlash, FaLock, FaUserCircle } from "react-icons/fa";

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth(); // Use the login method from AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("Submitting login with credentials:", { username, password }); // Debugging payload
            await login({ username: username.trim(), password: password.trim() });

            setErrorMessage(""); // Clear any previous error messages

            // Fetch the user from the context (or directly from the user state if you store it)
            const user = JSON.parse(sessionStorage.getItem("user"));

            // Redirect based on user role
            if (user?.role === "User") {
                navigate("/user");
            } else if (user?.role === "Admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/transferaction");
            }

            if (onLoginSuccess) {
                onLoginSuccess(user);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage(
                error.message || "An error occurred during login. Please try again."
            );
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-4">
            <h2 className="font-light text-2xl text-center my-5 md:hidden">LOGIN</h2>
            <form onSubmit={handleSubmit} className="px-4">
                <div className="relative">
                    <label className="block text-[#ababab] text-md font-medium mb-1">
                        Email or Username
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pt-3 pl-4">
                            <FaUserCircle className="text-primary-dark" size={20} />
                        </span>
                        <input
                            type="text"
                            className="bg-no-repeat bg-left appearance-none rounded-lg p-3 pl-12 text-sm text-black w-full mb-4 border-0"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrorMessage(""); // Clear error message when the user types
                            }}
                            required
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-[#ababab] text-md font-medium mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pt-3 pl-4">
                            <FaLock className="text-primary-dark" size={20} />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="bg-no-repeat bg-left appearance-none  rounded-lg p-3 pl-12 text-sm text-black w-full mb-4 border-0"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMessage(""); // Clear error message when the user types
                            }}
                            required
                            autoComplete="off"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 pt-3 right-3 cursor-pointer"
                        >
                            {!showPassword ? (
                                <FaEye className="text-primary-dark" size={24} />
                            ) : (
                                <FaEyeSlash className="text-primary-dark" size={24} />
                            )}
                        </span>
                    </div>
                </div>

                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                )}

                <button
                    type="submit"
                    className="bg-primary-yellow w-full font-medium px-3 py-2 mb-5 rounded-lg uppercase leading-3 text-sm transition duration-300 bg-fillButton h-10 mt-3 text-primary-dark disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;

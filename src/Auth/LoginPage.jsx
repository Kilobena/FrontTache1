import React, { useState } from "react";
import Auth from "../service/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../providers/AuthContext'; 

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login, updateUser } = useAuth(); 
    const navigate = useNavigate();
    const authApi = new Auth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authApi.loginUser({ username, password });

            if (response.success) {
                updateUser({
                    token: response.token,
                    user: response.user
                });

                if (onLoginSuccess) {
                    onLoginSuccess(response.user);
                }

                setErrorMessage("");
                if (response.user.role === "User") {
                    navigate("/user");
                } else {
                    navigate("/transferaction");
                }
            } else {
                setErrorMessage(response.message || "Failed to login. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage(
                error.response?.data.message || "An error occurred during login. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Email or Username</label>
                    <input
                        type="text"
                        className="bg-gray-700 text-white p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        className="bg-gray-700 text-white p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                {errorMessage && (
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                )}
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;

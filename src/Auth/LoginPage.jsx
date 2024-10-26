import React, { useState } from "react";
import Auth from "../service/Auth"; // Import the Auth service
import { useNavigate } from "react-router-dom"; // For redirecting after login

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const authApi = new Auth(); // Initialize the Auth API
    const navigate = useNavigate(); // For navigation after successful login

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when login starts

        try {
            // Call the loginUser method with username and password
            const response = await authApi.loginUser({ username, password });

            if (response.success) {
                // If login is successful, store the token and user data in localStorage
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user)); // Store user data (username, role)

                // Optionally call onLoginSuccess with user data
                if (onLoginSuccess) {
                    onLoginSuccess(response.user);
                }

                console.log("User logged in:", response.user);
                setErrorMessage(""); // Clear any previous error messages

                // Redirect to the dashboard page (starting with /transferaction as per your routes)
                navigate("/transferaction");

            } else {
                // Handle login failure with an appropriate message
                setErrorMessage(response.message || "Failed to login. Please try again.");
            }
        } catch (error) {
            // Log the entire error object for debugging
            console.error("Full error object during login:", error);

            // Check if it's an Axios error and if it has a response
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error status:", error.response.status);
                setErrorMessage(error.response.data.message || "An error occurred during login.");
            } else {
                // Handle network or unexpected errors
                setErrorMessage("An error occurred during login. Please try again.");
            }
        } finally {
            setIsLoading(false); // Set loading to false when login is done
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="border border-gray-300 p-2 rounded w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                )}
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
                    disabled={isLoading} // Disable button during loading
                >
                    {isLoading ? "Logging in..." : "Login"} {/* Show loading text */}
                </button>
            </form>
        </div>
    );
};

export default Login;

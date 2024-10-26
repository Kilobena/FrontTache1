import React, { useState } from "react";
import Auth from "../service/Auth"; 
import { useNavigate } from "react-router-dom"; 

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const authApi = new Auth(); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            const response = await authApi.loginUser({ username, password });

            if (response.success) {
                // Stocker les données de l'utilisateur et le token
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));

                // Appeler la fonction de succès de connexion
                if (onLoginSuccess) {
                    onLoginSuccess(response.user);
                }

                console.log("User logged in:", response.user);
                setErrorMessage(""); // Réinitialiser le message d'erreur

                navigate("/transferaction"); // Rediriger vers la page de transfert

            } else {
                setErrorMessage(response.message || "Failed to login. Please try again.");
            }
        } catch (error) {
            console.error("Full error object during login:", error);
            console.error("Error response data:", error.response?.data);
            console.error("Error status:", error.response?.status);

            setErrorMessage(
                error.response?.data.message || "An error occurred during login. Please try again."
            );
        } finally {
            setIsLoading(false); // Réinitialiser le chargement
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
                    disabled={isLoading} // Désactiver le bouton pendant le chargement
                >
                    {isLoading ? "Logging in..." : "Login"} {/* Afficher le texte de chargement */}
                </button>
            </form>
        </div>
    );
};

export default Login;

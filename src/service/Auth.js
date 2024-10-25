import axios from "axios";

class Auth {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://backendtache1-production.up.railway.app/",
        });
    }

    async registerUser(profile) {
        try {
            const response = await this.api.post("/auth/register", {
                username: profile.username ?? "",
                password: profile.password ?? "",
                role: profile.role ?? "",
            });

            return {
                success: true,
                status: response.status,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "An error occurred",
                };
            } else {
                // Erreur réseau ou autre erreur
                return {
                    success: false,
                    status: 500, // ou un autre code par défaut
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }
}

export default Auth;

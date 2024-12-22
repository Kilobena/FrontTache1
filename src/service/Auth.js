import axios from "axios";
import Cookies from "js-cookie"; // To handle cookies

class Auth {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://catch-me.bet/",  // Ensure this is your correct backend URL
        });

        // Adding a request interceptor to add the token to request headers
        this.api.interceptors.request.use(
            (config) => {
                const token = Cookies.get("access_token"); // Get the access token from cookies
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`; // Attach the token
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Adding a response interceptor to handle token refresh logic
        this.api.interceptors.response.use(
            response => response,  // Continue with successful responses
            async (error) => {
                if (error.response && error.response.status === 401) {
                    // Unauthorized error, token might be expired
                    const refreshToken = Cookies.get("refresh_token");
                    if (refreshToken) {
                        try {
                            const response = await this.api.post("/auth/refresh", { refresh_token: refreshToken });
                            // Store new access token and refresh token
                            Cookies.set("access_token", response.data.access_token, { expires: 1 }); // Access token expires in 1 day
                            Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 }); // Refresh token expires in 7 days

                            // Retry the original request with the new token
                            error.config.headers["Authorization"] = `Bearer ${response.data.access_token}`;
                            return this.api(error.config);
                        } catch (refreshError) {
                            console.error("Error refreshing the token:", refreshError);
                            // Handle token refresh failure (e.g., log out the user)
                            this.logout();
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    // Method to register a new user
    async registerUser(profile) {
        try {
            const response = await this.api.post("/auth/register", {
                username: profile.username ?? "",
                password: profile.password ?? "",
                role: profile.role ?? "user",
                id: profile.id
            });

            return {
                success: true,
                status: response.status,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);

            if (error.response) {
                if (error.response.status === 409) {
                    return {
                        success: false,
                        status: 409,
                        message: "Utilisateur déjà enregistré",  // Custom error for user already exists
                    };
                }
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de l'enregistrement",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to login a user
    async loginUser(credentials) {
        try {
            const response = await this.api.post("/auth/login", {
                username: credentials.username ?? "",
                password: credentials.password ?? ""
            });

            // Store the access token and refresh token in cookies
            Cookies.set("access_token", response.data.access_token, { expires: 1 }); // Access token expires in 1 day
            Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 }); // Refresh token expires in 7 days

            return {
                success: true,
                status: response.status,
                token: response.data.access_token,
                user: response.data.user,
                message: response.data.message
            };
        } catch (error) {
            console.error("Erreur lors de la connexion de l'utilisateur :", error);

            if (error.response) {
                if (error.response.status === 401) {
                    return {
                        success: false,
                        status: 401,
                        message: "Mot de passe incorrect",  // Custom error for wrong credentials
                    };
                }
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data?.message || "Une erreur est survenue lors de la connexion",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to get users by role
    async getUsersByRole(role) {
        try {
            const response = await this.api.post(
                "/auth/usersByRole",
                { role: role ?? "" }
            );

            return {
                success: true,
                status: response.status,
                users: response.data.users,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs par rôle :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la récupération des utilisateurs",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to delete user by username (Include JWT in headers)
    async deleteUserByUsername(username) {
        try {
            const response = await this.api.delete("/auth/delete_user", {
                data: { username: username ?? "" }
            });

            return {
                success: true,
                status: response.status,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la suppression de l'utilisateur",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to get balance for a user
    async getBalance(username) {
        try {
            const response = await this.api.post("/auth/getBalance", {
                username: username ?? ""
            });

            return {
                success: true,
                status: response.status,
                balance: response.data.balance,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération du solde de l'utilisateur :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la récupération du solde",
                };
            } else {
                return {
                    success: false,
                    status: 500,
                    message: "Network error or server is unreachable.",
                };
            }
        }
    }

    // Method to handle logging out
    logout() {
        // Remove tokens from cookies
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        // Redirect the user to the login page or another appropriate action
        window.location.href = "/login";  // Replace with actual logout redirect
    }
}

export default Auth;

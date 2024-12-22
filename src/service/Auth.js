import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie to manage cookies
import { jwtDecode } from 'jwt-decode';
class Auth {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://catch-me.bet/",  // Ensure this is your correct backend URL
        });

        // Add an interceptor to handle token refresh
        this.api.interceptors.response.use(
            response => response, // If the response is successful, return it
            async error => {
                const originalRequest = error.config;
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    // Try to refresh the token if expired
                    const refreshToken = Cookies.get('refresh_token');
                    if (refreshToken) {
                        try {
                            const refreshResponse = await this.refreshToken(refreshToken);
                            const { token } = refreshResponse;

                            // Save the new token to cookies
                            Cookies.set('token', token);
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;

                            // Retry the original request
                            return this.api(originalRequest);
                        } catch (refreshError) {
                            // If refresh fails, log out the user
                            console.error("Token refresh failed:", refreshError);
                            return Promise.reject(refreshError);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
    }
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Get the current time in seconds
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Assume expired if there's an error decoding
        }
    }
    // Method to refresh the token using the refresh token
    async refreshToken(refreshToken) {
        try {
            const response = await this.api.post("/auth/refresh-token", { refreshToken });
            return response.data;
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
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
                        message: "Utilisateur déjà enregistré",
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

            // Store the tokens (both access and refresh tokens) in cookies
            Cookies.set('token', response.data.token);
            Cookies.set('refresh_token', response.data.refresh_token);

            return {
                success: true,
                status: response.status,
                token: response.data.token,
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
                        message: "Mot de passe incorrect",
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
            const token = Cookies.get('token');
            const response = await this.api.post("/auth/usersByRole",
                { role: role ?? "" },
                { headers: { Authorization: `Bearer ${token}` } }
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

    // Method to delete user by username
    async deleteUserByUsername(username) {
        try {
            const token = Cookies.get('token');
            const response = await this.api.delete("/auth/delete_user", {
                data: { username: username ?? "" },
                headers: { Authorization: `Bearer ${token}` }
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

    // Method to get all users
    async getAllUsers() {
        try {
            const token = Cookies.get('token');
            const response = await this.api.get("/auth/getallusers", {
                headers: { Authorization: `Bearer ${token}` }
            });

            return {
                success: true,
                status: response.status,
                users: response.data.users,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération de tous les utilisateurs :", error);

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

    // Method to get the balance of a user
    async getBalance(username) {
        try {
            const token = Cookies.get('token');
            const response = await this.api.post("/auth/getBalance",
                { username: username ?? "" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

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

    // Method to get users by creator ID
    async getUsersByCreatorId(creatorId) {
        try {
            const token = Cookies.get('token');
            const response = await this.api.get(`/auth/users/role/${creatorId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return {
                success: true,
                status: response.status,
                users: response.data.users,
            };
        } catch (error) {
            console.error("Error fetching users by creator ID:", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Error retrieving users.",
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
}

export default Auth;

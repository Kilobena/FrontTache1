import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie to manage cookiesl
import { jwtDecode } from 'jwt-decode';
class Auth {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://catch-me.bet/",  // Ensure this is your correct backend URL
        });

        // Add an interceptor to handle token refresh
        this.api.interceptors.request.use(
            (config) => {
                const token = Cookies.get("token");
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Add a response interceptor to handle token refresh
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && error.response.status === 401) {
                    // Token expired, try to refresh


                    const newToken = await this.refreshToken();
                    if (newToken) {
                        // Retry the original request with the new token
                        error.config.headers["Authorization"] = `Bearer ${newToken}`;
                        return axios(error.config);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    // Method to refresh the token using the refresh token


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
    async refreshToken() {
        try {
            const response = await this.api.post("/auth/refresh-token", {
            }, {
                withCredentials: true, // Optional: Use this if you still want to send cookies
            });


            const newAccessToken = response.data.accessToken;
            Cookies.set("token", newAccessToken); // Save the new token
            return newAccessToken;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            return null;
        }
    }

    // Method to login a user
    async loginUser(credentials) {
        try {
            const response = await this.api.post("/auth/login", {
                username: credentials.username ?? "",
                password: credentials.password ?? ""
            },{
                withCredentials: true,
                }
            );

            // Store the tokens (both access and refresh tokens) in cookies
            Cookies.set('token', response.data.token);

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
            const response = await this.api.post("/auth/updatebalance",
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

import axios from "axios";

class Auth {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://catch-me.bet/",
            withCredentials: true,
        });

        this.accessToken = sessionStorage.getItem("accessToken") || null;
        console.log("Initial token:", this.accessToken);

        // Attach Authorization header to all requests
        this.api.interceptors.request.use(
            (config) => {
                console.log("Request Config:", config);
                if (this.accessToken) {
                    config.headers["Authorization"] = `Bearer ${this.accessToken}`;
                }
                return config;
            },
            (error) => {
                console.error("Request error:", error);
                return Promise.reject(error);
            }
        );

        // Handle 401 errors and refresh tokens
        this.api.interceptors.response.use(
            (response) => response, // Pass through successful responses
            async (error) => {
                const originalRequest = error.config;
        
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
        
                    try {
                        // Attempt to refresh the token
                        const refreshResponse = await this.refreshAccessToken();
                        this.accessToken = refreshResponse.token;
                        originalRequest.headers["Authorization"] = `Bearer ${this.accessToken}`;
                        return this.api(originalRequest); // Retry the original request
                    } catch (refreshError) {
                        console.error("Token refresh failed. Logging out user:", refreshError);
                        await this.logoutUser(); // Ensure proper logout
                        return Promise.reject(refreshError);
                    }
                }
        
                return Promise.reject(error);
            }
        );
        
        
    }

    async refreshAccessToken() {
        try {
            console.log("Attempting to refresh access token...");
            const response = await this.api.post("/auth/refresh-token", {}, { withCredentials: true });
            const { token } = response.data;
    
            this.accessToken = token; // Update the token
            sessionStorage.setItem("accessToken", token); // Save new token in session storage
    
            console.log("Token refreshed successfully:", token);
            return { success: true, token };
        } catch (error) {
            console.error("Error refreshing access token:", error.response?.data || error);
            throw error; // Propagate the error to the interceptor
        }
    }
    



    async registerUser(profile) {
        try {
            const response = await this.api.post("/auth/register", {
                username: profile.username,
                password: profile.password,
                role: profile.role,
                id: profile.id,
            });
    
            return {
                success: true,
                status: response.status,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Error registering user:", error.response?.data || error);
            return {
                success: false,
                status: error.response?.status || 500,
                message: error.response?.data?.message || "An error occurred during registration.",
            };
        }
    }
    

    async loginUser(credentials) {
        try {
            console.log("Login request payload:", credentials); // Debugging log
            const response = await this.api.post("/auth/login", credentials);
    
            const { token, user } = response.data;
    
            this.accessToken = token;
            sessionStorage.setItem("accessToken", token);
            sessionStorage.setItem("user", JSON.stringify(user));
    
            return { success: true, user, message: response.data.message };
        } catch (error) {
            console.error("Error logging in user:", error.response?.data || error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed.",
            };
        }
    }
    
    async getUserByUsername(username) {
        try {
            const response = await this.api.get(`/auth/pages/User/${username}`);
            return {
                success: true,
                user: response.data.user,
            };
        } catch (error) {
            console.error("Error fetching user by username:", error.response?.data || error);
            return this.handleError(error, "Failed to fetch user by username.");
        }
    }


    async getProfile() {
        try {
            const response = await this.api.post("/auth/profile");
            return {
                success: true,
                profile: response.data.user,
            };
        } catch (error) {
            console.error("Error fetching user profile:", error.response?.data || error);
            return this.handleError(error, "Failed to fetch user profile.");
        }
    }

    async deleteUserByUsername(username) {
        try {
            const response = await this.api.delete("/auth/delete_user", {
                data: { username }, // Pass the username in the request body
            });
            return {
                success: true,
                message: response.data.message,
            };
        } catch (error) {
            console.error("Error deleting user by username:", error.response?.data || error);
            return this.handleError(error, "Failed to delete user by username.");
        }
    }

    async getUsersByCreaterId(createrId) {
        try {
            const response = await this.api.get(`/auth/users/role/${createrId}`);
            return {
                success: true,
                users: response.data.users,
            };
        } catch (error) {
            console.error("Error fetching users by creator ID:", error.response?.data || error);
            return this.handleError(error, "Failed to fetch users by creator ID.");
        }
    }
    
    
    

  
    async logoutUser() {
        try {
            console.log("Attempting to log out user...");
            // Notify backend to revoke the session
            await this.api.post("/auth/logout", {}, { withCredentials: true });
    
            // Clear session data
            this.accessToken = null;
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("user");
    
            console.log("User logged out successfully.");
            return { success: true, message: "Logged out successfully." };
        } catch (error) {
            console.error("Error logging out user:", error.response?.data || error);
            return this.handleError(error, "An error occurred during logout.");
        }
    }
    
    

    handleError(error, defaultMessage) {
        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                message: error.response.data.message || defaultMessage,
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

export default Auth;

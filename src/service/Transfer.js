import axios from "axios";

class TransferService {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://backendtache1-production.up.railway.app/",  // Ensure this is your correct backend URL
        });
    }

    // Method to make a transfer (deposit or withdraw)
    async makeTransfer({ senderUsername, receiverUsername, amount, type, note }) {
        try {
            const token = localStorage.getItem('token');  // Get the JWT token from localStorage
            const response = await this.api.post("/tr/transfer", {
                senderUsername: senderUsername ?? "",
                receiverUsername: receiverUsername ?? "",
                amount: amount ?? 0,
                type: type ?? "transfer",
                note: note ?? ""
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the JWT token in headers
                }
            });

            return {
                success: true,
                status: response.status,
                message: response.data.message,
                senderBalance: response.data.senderBalance,
                receiverBalance: response.data.receiverBalance
            };
        } catch (error) {
            console.error("Erreur lors du transfert :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors du transfert",
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

    // Method to get transfer history for a user
    async getTransferHistory(username) {
        try {
            const token = localStorage.getItem('token');  // Get the JWT token from localStorage
            const response = await this.api.get("/tr/transfer-history", {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the JWT token in headers
                },
                params: {
                    username: username ?? ""
                }
            });

            return {
                success: true,
                status: response.status,
                transferHistory: response.data.transferHistory,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération de l'historique des transferts :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la récupération des transferts",
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

    // Optional: Method to get all transfers (admin functionality)
    async getAllTransfers() {
        try {
            const token = localStorage.getItem('token');  // Get the JWT token from localStorage
            const response = await this.api.get("/transfer/all", {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the JWT token in headers
                }
            });

            return {
                success: true,
                status: response.status,
                transfers: response.data.transfers,  // List of all transfers
            };
        } catch (error) {
            console.error("Erreur lors de la récupération de tous les transferts :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la récupération des transferts",
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

export default TransferService;

import axios from "axios";

class TransferService {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://backendtache1-production.up.railway.app/",
        });
    }

    // Method to handle transactions (deposit or withdraw)
    async makeTransaction({ senderUsername, amount, type, note }) {
        try {
            const token = localStorage.getItem('token');
            const response = await this.api.post("/tr/transaction", {  // Changed the endpoint to '/tr/transaction'
                senderUsername: senderUsername ?? "",
                amount: amount ?? 0,
                type: type ?? "deposit",  // Either 'deposit' or 'withdraw'
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
            };
        } catch (error) {
            console.error("Erreur lors de la transaction :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la transaction",
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

    // Optional: Method to get transaction history for a user
    async getTransactionHistory(username) {
        try {
            const token = localStorage.getItem('token');  // Get the JWT token from localStorage
            const response = await this.api.get("/tr/transaction-history", {
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
                transactionHistory: response.data.transactionHistory,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération de l'historique des transactions :", error);

            if (error.response) {
                return {
                    success: false,
                    status: error.response.status,
                    message: error.response.data.message || "Une erreur est survenue lors de la récupération des transactions",
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

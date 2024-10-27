import axios from "axios";

class TransferService {
    constructor(baseURL) {
        this.api = axios.create({
            baseURL: baseURL || "https://backendtache1-production.up.railway.app/",
        });
    }

    async makeTransfer(senderId, receiverId, amount, type, note) {
        try {
            const token = localStorage.getItem('token');

            // Envoyer la requête POST pour le transfert
            const response = await this.api.post("/tr/transfer", {
                senderId,
                receiverId,
                amount,
                type,
                note
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Vérifier si la réponse est un succès
            return {
                success: true,
                message: response.data.message,
                transfer: response.data.data.transfer,
                updatedSender: response.data.updatedSender,
                updatedReceiver: response.data.updatedReceiver
            };
        } catch (error) {
            console.error("Erreur lors de la création du transfert :", error);

            // Gestion des erreurs
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || "Une erreur est survenue lors de la création du transfert",
                    status: error.response.status
                };
            } else {
                return {
                    success: false,
                    message: "Erreur réseau ou le serveur est inaccessible.",
                    status: 500
                };
            }
        }
    }

    async getUserInfo(username, token) {
        try {
            const response = await this.api.get(`/auth/user/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return {
                success: true,
                user: response.data.user,
            };
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
            return {
                success: false,
                message: error.response ? error.response.data.message : "Une erreur est survenue lors de la récupération des informations de l'utilisateur",
            };
        }
    }
}

export default TransferService;

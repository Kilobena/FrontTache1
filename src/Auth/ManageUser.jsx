import React, { useState, useEffect } from "react";
import Auth from "../service/Auth";
import { useNavigate } from "react-router-dom/dist";

const ManageUser = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Assurez-vous que l'utilisateur est un objet JSON
    const [selectedRole, setSelectedRole] = useState("Select option");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const authApi = new Auth();

    const getAvailableRoles = () => {
        if (user.role === "Partner") {
            return ["User", "Assistant", "Admin", "SuperAdmin"];
        } else if (user.role === "SuperAdmin") {
            return ["User", "Assistant", "Admin"];
        } else if (user.role === "Admin") {
            return ["User", "Assistant"];
        } else {
            return ["User"]; // Si l'utilisateur est un User normal
        }
    };

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await authApi.api.get("/auth/usersByRole");
                setAllUsers(response.data.users);
                setFilteredUsers(response.data.users);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
                setError("Erreur lors de la récupération des utilisateurs.");
            }
        };

        fetchAllUsers();
    }, [authApi]);

    const handleSearch = async () => {
        if (selectedRole === "Select option") {
            setError("Veuillez sélectionner un rôle.");
            setShowModal(true);
            return;
        }
        console.log("hetha"+selectedRole)

        const result = await authApi.getUsersByRole(selectedRole);
        if (result.success) {
            setFilteredUsers(result.users);
            setError("");
        } else {
            setFilteredUsers([]); 
            setError(result.message);
            setShowModal(true);
        }
    };

    const handleReset = () => {
        setSelectedRole("Select option");
        setFilteredUsers(allUsers);
        setError("");
        setShowModal(false);
    };

    const handleDeleteUser = async (username) => {
        try {
            const response = await authApi.deleteUserByUsername(username);
            if (response.success) {
                setFilteredUsers(filteredUsers.filter(user => user.username !== username));
                setAllUsers(allUsers.filter(user => user.username !== username));
                setError("");
            } else {
                setError(response.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            setError("Erreur lors de la suppression de l'utilisateur.");
            setShowModal(true);
        }
    };

    const roles = getAvailableRoles(); // Obtenez les rôles disponibles en fonction du rôle de l'utilisateur

    return (
        <div className="flex flex-col justify-start h-screen w-full">
            <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
                Manage Users
            </h1>
         
            <div className="w-full max-w-lg bg-white px-9 rounded mt-6">
                <h2 className="text-xl mb-4">Role</h2>
                <div className="mb-4">
                    <select
                        className="border border-gray-300 p-2 rounded w-full"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="Select option" disabled>
                            Select option
                        </option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-row space-x-4 pb-3 w-full">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-1/2"
                        type="button"
                        onClick={handleSearch}
                    >
                        SEARCH
                    </button>
                    <button
                        className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none w-1/2"
                        type="reset"
                        onClick={handleReset}
                    >
                        RESET
                    </button>
                </div>
            </div>

            <div className="flex justify-center pt-10">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-4 px-4 border-b border-gray-300 text-center">Username</th>
                            <th className="py-4 px-4 border-b border-gray-300 text-center">Role</th>
                            <th className="py-4 px-4 border-b border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="py-4 px-4 border-b border-gray-300 text-center">{user.username}</td>
                                    <td className="py-4 px-4 border-b border-gray-300 text-center">{user.role}</td>
                                    <td className="py-4 px-4 border-b border-gray-300 text-center">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteUser(user.username)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    <img src="/images/loop.png" alt="No results found" className="mx-auto w-8 h-8" />
                                    <p>Aucun utilisateur trouvé.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;

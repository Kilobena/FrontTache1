import React, { useState } from "react";
import Auth from "../service/Auth";

const ManageUser = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showNoUsersMessage, setShowNoUsersMessage] = useState(false);
    const authApi = new Auth();

    // Function to fetch all users and set suggestions
    const fetchAllUsers = async () => {
        try {
            const response = await authApi.api.get("/auth/getallusers");
            setAllUsers(response.data.users);
            setSuggestions(response.data.users); // Initially, show all users as suggestions
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Error fetching users.");
            setShowModal(true);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError("Please enter a search term.");
            setShowModal(true);
            return;
        }

        const filtered = allUsers.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filtered);
        setShowNoUsersMessage(filtered.length === 0);
        setError(filtered.length === 0 ? "No users found." : "");
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            // Filter suggestions as user types
            const filtered = allUsers.filter((user) =>
                user.username.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions(allUsers); // If no input, show all users as suggestions
        }
    };

    const handleFocus = async () => {
        if (allUsers.length === 0) {
            // Fetch users only if not already fetched
            await fetchAllUsers();
        }
    };

    const handleSuggestionClick = (username) => {
        setSearchTerm(username);
        setSuggestions([]);
    };

    const handleReset = () => {
        setSearchTerm("");
        setFilteredUsers([]);
        setSuggestions([]);
        setShowNoUsersMessage(false);
        setError("");
        setShowModal(false);
    };

    const handleDeleteUser = async (username) => {
        try {
            const response = await authApi.deleteUserByUsername(username);
            if (response.success) {
                setFilteredUsers(filteredUsers.filter(user => user.username !== username));
                setError("");
            } else {
                setError(response.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user.");
            setShowModal(true);
        }
    };

    return (
        <div className="flex flex-col justify-start h-screen w-full">
            <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
                Manage Users
            </h1>

            <div className="w-full max-w-lg bg-white px-9 rounded mt-6">
                <h2 className="text-xl mb-4">Search for a User</h2>
                <div className="relative mb-4">
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded w-full"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={handleFocus}  // Fetch users on input focus
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute bg-white border border-gray-300 mt-1 rounded w-full z-10">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion._id}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSuggestionClick(suggestion.username)}
                                >
                                    {suggestion.username} ({suggestion.role})
                                </li>
                            ))}
                        </ul>
                    )}
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

            {/* Show "No users found" message if no users are found */}
            {showNoUsersMessage && (
                <div className="flex justify-center pt-10">
                    <div className="text-center">
                        <img src="/images/loop.png" alt="No data" className="mx-auto w-16 h-16" />
                        <p className="text-gray-600 mt-4">Search all available records by selecting one of the filters above!</p>
                    </div>
                </div>
            )}

            {/* Only display the table when filteredUsers is not empty */}
            {filteredUsers.length > 0 && !showNoUsersMessage && (
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
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b">
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
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && error && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-xl font-bold">Error</h2>
                        <p>{error}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUser;

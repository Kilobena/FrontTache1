import React, { useState } from "react";
import Auth from "../service/Auth";
import { useAuth } from '../providers/AuthContext'; 

const ManageUser = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [showNoUsersMessage, setShowNoUsersMessage] = useState(false); // For no users found message
    const authApi = new Auth();
    const { user } = useAuth(); 

    // Function to fetch all users and set suggestions
    const fetchAllUsers = async () => {
        try {
            const response = await authApi.api.get(`/auth/usersByCreater/${user._id}`);
            setAllUsers(response.data.users);
            setSuggestions(response.data.users); // Initially, show all users as suggestions
        } catch (error) {
            console.error("Error fetching users:", error);
            setShowNoUsersMessage(true); // Show no users found if the fetch fails
        }
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setShowNoUsersMessage(true);
            return;
        }

        const filtered = allUsers.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filtered);
        setShowNoUsersMessage(filtered.length === 0);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filtered = allUsers.filter((user) =>
                user.username.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setShowNoUsersMessage(filtered.length === 0); // Show message when no users are found
        } else {
            setSuggestions([]); // Clear suggestions if no input
            setShowNoUsersMessage(false); // Hide no users message if input is cleared
        }
    };

    const handleFocus = async () => {
        if (allUsers.length === 0) {
            await fetchAllUsers(); // Fetch users only if not already fetched
        }
    };

    const handleSuggestionClick = (username) => {
        setSearchTerm(username);
        setSuggestions([]);
        handleSearch(); // Perform search when a suggestion is clicked
    };

    const handleReset = () => {
        setSearchTerm("");
        setFilteredUsers([]);
        setSuggestions([]);
        setShowNoUsersMessage(false);
    };

    const handleDeleteUser = async (username) => {
        try {
            const response = await authApi.deleteUserByUsername(username);
            if (response.success) {
                setFilteredUsers(filteredUsers.filter(user => user.username !== username));
                setAllUsers(allUsers.filter(user => user.username !== username));
            } else {
                setShowNoUsersMessage(true); // Show no users found if delete fails
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setShowNoUsersMessage(true); // Show no users found if an error occurs
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
                    {suggestions.length > 0 ? (
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
                    ) : searchTerm && showNoUsersMessage ? (
                        <ul className="absolute bg-white border border-gray-300 mt-1 rounded w-full z-10">
                            <li className="p-2 text-gray-500">No users found</li>
                        </ul>
                    ) : null}
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
            {showNoUsersMessage && !searchTerm && (
                <div className="flex justify-center pt-10">
                    <div className="text-center">
                        <img src="/images/loop.png" alt="No data" className="mx-auto w-16 h-16" />
                        <p className="text-gray-600 mt-4">No users found.</p>
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
        </div>
    );
};

export default ManageUser;

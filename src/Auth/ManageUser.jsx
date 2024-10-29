import React, { useState, useEffect, useRef } from "react";
import Auth from "../service/Auth";
import { useAuth } from '../providers/AuthContext'; 

const ManageUser = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);  // Stores filtered users to display in the table
    const [allUsers, setAllUsers] = useState([]);
    const [showNoUsersMessage, setShowNoUsersMessage] = useState(false);
    const authApi = new Auth();
    const { user } = useAuth();

    const inputRef = useRef(null);
    const suggestionBoxRef = useRef(null);

    const fetchAllUsers = async () => {
        try {
            let response;
            if (user.role === "SuperPartner") {
                response = await authApi.api.get(`/auth/getAllUsers`);
            } else {
                response = await authApi.api.get(`/auth/usersByCreater/${user._id}`);
            }
            if (response.data.users.length === 0) {
                setShowNoUsersMessage(true);
            } else {
                setAllUsers(response.data.users);
                setSuggestions(response.data.users);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setShowNoUsersMessage(true);
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
            setShowNoUsersMessage(filtered.length === 0);
        } else {
            setSuggestions([]);
            setShowNoUsersMessage(false);
        }
    };

    const handleFocus = async () => {
        if (allUsers.length === 0) {
            await fetchAllUsers();
        }
    };

    const handleReset = () => {
        setSearchTerm("");
        setFilteredUsers([]);
        setSuggestions([]);
        setShowNoUsersMessage(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionBoxRef.current &&
                !suggestionBoxRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col justify-start h-screen w-full p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
                Manage Users
            </h1>
            <div className="w-full max-w-lg bg-white px-9 py-6 rounded mt-6">
                <h2 className="text-xl mb-4">Search for a User</h2>
                <div className="relative mb-4" ref={suggestionBoxRef}>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        ref={inputRef}
                    />
                    {suggestions.length > 0 ? (
                        <ul className="absolute bg-white border border-gray-300 mt-1 rounded w-full z-10">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion._id}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => setSearchTerm(suggestion.username)}
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
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
                        type="button"
                        onClick={handleSearch}
                    >
                        SEARCH
                    </button>
                    <button
                        className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full"
                        type="reset"
                        onClick={handleReset}
                    >
                        RESET
                    </button>
                </div>
            </div>

            {/* Display the user list table if there are filtered users */}
            {filteredUsers.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">User List:</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border">Username</th>
                                    <th className="py-2 px-4 border">Role</th>
                                    <th className="py-2 px-4 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border text-center">{user.username}</td>
                                        <td className="py-2 px-4 border text-center">{user.role}</td>
                                        <td className="py-2 px-4 border text-center">
                                            <button className="bg-red-500 text-white px-2 py-1 rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Show "No users found" message if applicable */}
            {showNoUsersMessage && filteredUsers.length === 0 && (
                <div className="mt-6 text-center text-gray-500">No users found for the search term.</div>
            )}
        </div>
    );
};

export default ManageUser;

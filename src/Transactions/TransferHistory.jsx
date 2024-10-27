import React, { useState, useEffect } from 'react';
import TransferService from '../service/Transfer';  // Ensure correct path
import { useAuth } from '../providers/AuthContext';

const TransferHistory = () => {
    const { user } = useAuth();  // Fetch current user from context
    const [selectedDate, setSelectedDate] = useState('today');
    const [chosenDate, setChosenDate] = useState('');
    const [transferOptions, setTransferOptions] = useState([]);  // Users for the dropdown
    const [selectedUser, setSelectedUser] = useState('');        // Store selected user
    const [transfers, setTransfers] = useState([]);              // Store transfer history
    const [errorMessage, setErrorMessage] = useState(null);

    const transferServ = new TransferService();
    const today = new Date().toISOString().split('T')[0];  // Today's date in YYYY-MM-DD format

    // Fetch users for the "Transfer To / From" dropdown
    const fetchUsers = async () => {
        try {
            const result = await transferServ.getUserInfo(user.username, localStorage.getItem('token'));
            if (result.success) {
                setTransferOptions(result.user);  // Assuming `user` returns a list of users
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setErrorMessage("Failed to load user options.");
        }
    };

    // Fetch the transfer history based on selected filters
    const fetchTransferHistory = async () => {
        try {
            const dateOption = selectedDate === 'custom' ? chosenDate : selectedDate;
            console.log("Fetching transfer history with date:", dateOption);

            const result = await transferServ.getTransferHistory(selectedUser || user.username, dateOption);

            if (result.success) {
                setTransfers(result.transferHistory);
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.error("Error fetching transfer history:", error);
            setErrorMessage("An error occurred while fetching transfer history.");
        }
    };

    useEffect(() => {
        fetchUsers();            // Fetch users for dropdown on component load
        fetchTransferHistory();   // Fetch transfer history on load
    }, [selectedDate, chosenDate]);

    // Options for date selection
    const dateOptions = [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 Days', value: '7days' },
        { label: 'This Month', value: 'month' },
        { label: 'Custom: Choose a date', value: 'custom' }
    ];

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="flex flex-col justify-start h-screen w-full">
                <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
                    Transfer History
                </h1>

                {/* Date Filter Section */}
                <div className="mb-8 pl-4">
                    <label className="block font-medium mb-4 text-gray-800 text-lg">
                        Transaction Date
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {dateOptions.map((option) => (
                            <label
                                key={option.value}
                                className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                                    selectedDate === option.value
                                        ? 'bg-yellow-400 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="transactionDate"
                                    value={option.value}
                                    checked={selectedDate === option.value}
                                    onChange={() => {
                                        setSelectedDate(option.value);
                                        if (option.value !== 'custom') {
                                            setChosenDate('');
                                        }
                                    }}
                                    className="form-radio h-5 w-5 text-yellow-500"
                                />
                                <span className="font-medium ml-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Custom Date Picker Section */}
                {selectedDate === 'custom' && (
                    <div className="mb-8 pl-4">
                        <label className="block font-medium mb-2 text-gray-800 text-lg">
                            Select a Date
                        </label>
                        <input
                            type="date"
                            value={chosenDate}
                            onChange={(e) => setChosenDate(e.target.value)}
                            max={today}
                            className="p-2 border border-gray-300 rounded bg-white w-1/4"
                        />
                    </div>
                )}

                {/* Transfer To / From Selection Section */}
                <div className="mb-8 pl-4">
                    <label className="block font-medium mb-2 text-gray-800 text-lg">Transfer To / From</label>
                    <select 
                        className="w-1/4 p-2 border border-gray-300 rounded bg-white text-lg"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">Select option</option>
                        {transferOptions.map((userOption) => (
                            <option key={userOption._id} value={userOption.username}>
                                {userOption.username} ({userOption.role})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mb-8 pl-4">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-1/6"
                        type="button"
                        onClick={fetchTransferHistory}
                    >
                        SEARCH
                    </button>
                    <button
                        className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none w-1/6"
                        type="reset"
                        onClick={() => {
                            setSelectedDate('today');
                            setChosenDate('');
                            setTransfers([]);
                            setErrorMessage(null);
                        }}
                    >
                        RESET
                    </button>
                </div>

                {/* Transfer History Display */}
                {errorMessage ? (
                    <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                ) : transfers.length > 0 ? (
                    <div className="pl-4">
                        <h2 className="text-lg font-bold mb-4">Transfer History:</h2>
                        <ul>
                            {transfers.map((transfer, index) => (
                                <li key={index} className="mb-2">
                                    <span className="font-bold">{transfer.type}</span> of {transfer.amount} on{' '}
                                    {new Date(transfer.date).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">No transfer history found for the selected filters.</div>
                )}
            </div>
        </div>
    );
};

export default TransferHistory;

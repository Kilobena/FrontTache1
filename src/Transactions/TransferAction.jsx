import React, { useState, useEffect } from 'react';
import TransferService from '../service/Transfer';  // Import TransferService
import Auth from '../service/Auth';  // Import Auth for fetching user list
import { useAuth } from '../providers/AuthContext';

const TransferForm = () => {
  const { user } = useAuth();  // Fetch current user from context
  const [transactionType, setTransactionType] = useState('deposit');  // Now "transactionType" instead of "transferType"
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [selectedUser, setSelectedUser] = useState('');  // State for selected user
  const [usersList, setUsersList] = useState([]);  // State for all available users
  const [message, setMessage] = useState(null);  // Message for success/failure
  const transferServ = new TransferService();  // Initialize TransferService
  const authServ = new Auth();  // Initialize Auth Service to get all users

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await authServ.getAllUsers();
      if (result.success) {
        setUsersList(result.users); 
      } else {
        console.error("Error fetching users:", result.message);
      }
    };
    fetchUsers();
  }, []);

  const handleAmountChange = (value) => {
    setAmount((prev) => prev + value);
  };

  const handleClear = () => setAmount(0);

  // Handle Transaction
  const handleTransaction = async () => {
    if (amount <= 0) {
      setMessage("Amount must be greater than zero.");
      return;
    }

    if (!selectedUser) {
      setMessage("Please select a user.");
      return;
    }

    const transactionData = {
      senderUsername: user.username,
      receiverUsername: selectedUser,  // Selected user for internal account transactions
      amount,
      type: transactionType,  // Deposit or Withdraw
      note
    };

    try {
      const result = await transferServ.makeTransaction(transactionData);  // Use updated service method

      // Log result for debugging
      console.log("Transaction Response: ", result);

      if (result.success) {
        setMessage(`Transaction successful! New balance: ${result.senderBalance}`);
        setAmount(0);  // Reset amount after successful transaction
        setNote("");    // Clear the note
        setSelectedUser("");  // Reset selected user
        setTransactionType('deposit');  // Optionally reset transaction type
      } else {
        setMessage(`Transaction failed: ${result.message}`);
      }
    } catch (error) {
      setMessage("An error occurred during the transaction.");
      console.error("Transaction Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col justify-start h-screen w-full">
        <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
          Transaction
        </h1>
        <div className="w-full max-w-lg bg-white p-6 rounded pt-7">
          
          {/* Select User Section */}
          <div className="relative mb-4">
            <label className="block font-medium mb-2 text-gray-800">Select User</label>
            <select
              className="block appearance-none w-full bg-white border border-black rounded p-2 text-gray-700 leading-tight focus:outline-none pr-10"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select USER</option>
              {usersList.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username} ({user.role})
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type Section */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-800">Transaction Type</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Deposit', value: 'deposit' },
                { label: 'Withdraw', value: 'withdraw' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                    transactionType === option.value
                      ? 'bg-yellow-400 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="transactionType"
                    value={option.value}
                    checked={transactionType === option.value}
                    onChange={() => setTransactionType(option.value)}
                    className="form-radio h-5 w-5 text-yellow-500 mr-2"
                  />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transaction Amount Section */}
          <div className="mb-4">
            <label className="block font-medium">Transaction Amount</label>
            <div className="flex space-x-4 mb-2">
              <input 
                type="text" 
                value={amount} 
                readOnly 
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button 
                onClick={handleClear}
                className="border border-black py-2 px-4 rounded focus:outline-none"
              >
                Clear
              </button>
            </div>

            <div className="flex space-x-4">
              {[10, 20, 50, 100, 500].map(value => (
                <button 
                  key={value} 
                  onClick={() => handleAmountChange(value)}
                  className="p-2 bg-gray-300 rounded"
                >
                  +{value}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Note Section */}
          <div className="mb-4">
            <label className="block font-medium">Transaction Note</label>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-32"
            ></textarea>
          </div>

          {/* Message Section */}
          {message && (
            <div className="mb-4 text-center text-red-500">
              {message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-1/2"
              type="button"
              onClick={handleTransaction}  // Call handleTransaction on click
            >
              SUBMIT
            </button>
            <button
              className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none w-1/2"
              type="reset"
              onClick={() => {
                setAmount(0);
                setNote('');
                setSelectedUser('');
                setMessage(null);
              }}
            >
              RESET
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransferForm;

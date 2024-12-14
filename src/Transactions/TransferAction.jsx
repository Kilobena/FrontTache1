import React, { useState, useEffect, useRef } from 'react';
import Auth from '../service/Auth';
import TransferService from '../service/Transfer';
import { useAuth } from '../providers/AuthContext';

const TransferForm = () => {
  const { user, updateUser } = useAuth(); 
  const [transferType, setTransferType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isUserListFetched, setIsUserListFetched] = useState(false);
  const [noUsersFound, setNoUsersFound] = useState(false);

  const authServ = new Auth();
  const transferServ = new TransferService();
  const suggestionBoxRef = useRef(null);

  // Fetch users based on user role
  const fetchAllUsers = async () => {
    try {
      let response;
      if (user.role === 'SuperPartner') {
        response = await authServ.api.get(`/auth/getAllUsers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        response = await authServ.getUsersByCreaterId(user._id);
      }

      console.log('API response:', response);

      if (response.success && Array.isArray(response.users)) {
        setAllUsers(response.users);
        setNoUsersFound(response.users.length === 0);
        setIsUserListFetched(true);
      } else {
        setNoUsersFound(true);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setNoUsersFound(true);
    }
  };

  const canInteractWith = (currentRole, targetRole) => {
    const permissions = {
      partner: ['superadmin', 'admin', 'assistant', 'user'],
      superadmin: ['admin', 'assistant', 'user'],
      admin: ['assistant', 'user'],
      assistant: ['user'],
    };
    if (currentRole === 'SuperPartner') {
      return true;
    }
    return permissions[currentRole.toLowerCase()]?.includes(targetRole.toLowerCase());
  };

  const filteredUsersForInteraction = allUsers.filter((listedUser) => {
    const canInteract = canInteractWith(user.role, listedUser.role);
    const isNotSelf = listedUser.username !== user.username;
    return canInteract && isNotSelf;
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);

    const filtered = value
      ? filteredUsersForInteraction.filter((user) =>
          user.username.toLowerCase().includes(value.toLowerCase())
        )
      : filteredUsersForInteraction;

    setFilteredUsers(filtered);
  };

  const handleSuggestionClick = (username, userId) => {
    setSearchTerm(username);
    setSelectedUser(userId);
    setShowSuggestions(false); 
  };

  const handleInputFocus = () => {
    if (isUserListFetched) {
      if (noUsersFound) {
        setMessage('No users found.');
        setModalType('error');
        setIsModalOpen(true);
      } else {
        setFilteredUsers(filteredUsersForInteraction); 
        setShowSuggestions(true); 
      }
    } else {
      setMessage('Still loading users...');
      setModalType('error');
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    fetchAllUsers();

    const handleClickOutside = (event) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const getFriendlyErrorMessage = (message) => {
    switch (message) {
      case "Sender or receiver not found":
        return "The selected user could not be found. Please try again.";
      case "Invalid amount specified":
        return "Please enter a valid amount greater than zero.";
      case "Insufficient balance for deposit including fees":
        return "You do not have enough balance to complete this deposit.";
      case "Insufficient balance for withdrawal including fees":
        return "The receiver does not have enough balance to fulfill this withdrawal.";
      case "Invalid transfer type":
        return "An invalid transfer type was selected. Please try again.";
      default:
        return "An unexpected error occurred. Please try again later.";
    }
  };
  

  const handleTransfer = async () => {
    if (!selectedUser) {
      setMessage('Please select a user.');
      setModalType('error');
      setIsModalOpen(true);
      return;
    }
    if (amount <= 0) {
      setMessage('The amount must be greater than zero.');
      setModalType('error');
      setIsModalOpen(true);
      return;
    }

    const transferData = {
      senderId: user._id,
      receiverId: selectedUser,
      amount,
      type: transferType,
      note,
    };

    try {
      const result = await transferServ.makeTransfer(
        transferData.senderId,
        transferData.receiverId,
        transferData.amount,
        transferData.type,
        transferData.note
      );
    
      if (result.success) {
        const updatedUserResponse = await authServ.getBalance(user.username);
    
        if (updatedUserResponse.success) {
          const updatedUser = { ...user, balance: updatedUserResponse.balance };
          updateUser(updatedUser);
          setMessage('Transfer successful!');
          setModalType('success');
        } else {
          setMessage(`Failed to retrieve updated balance: ${updatedUserResponse.message}`);
          setModalType('error');
        }
    
        setIsModalOpen(true);
        resetForm();
      } else {
        const userFriendlyMessage = getFriendlyErrorMessage(result.message);
        setMessage(userFriendlyMessage);
        setModalType('error');
        setIsModalOpen(true);
      }
    } catch (error) {
      const userFriendlyMessage = getFriendlyErrorMessage(error.message);
      setMessage(userFriendlyMessage);
      setModalType('error');
      setIsModalOpen(true);
    }
  }    

  const resetForm = () => {
    setAmount(0);
    setNote('');
    setSelectedUser('');
    setSearchTerm('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage(null);
  };

  return (
    <div className="flex flex-col h-screen w-full ">
<header className="bg-[#242424] text-white w-full py-4 text-center">
<h1 className="text-3xl font-bold">Transfer</h1>
      </header>

      <div className="flex-1 overflow-auto p-6 sm:p-8">
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"> {/* Updated to max-w-4xl */}
          

          {/* User Selection Input */}
          <div className="relative mb-4" ref={suggestionBoxRef}>
          <span className="font-medium text-black">Search for user</span>

            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black" 
              placeholder="Type the First 3 letters"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {showSuggestions && filteredUsers.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 mt-1 rounded w-full z-10">
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                    onClick={() => handleSuggestionClick(user.username, user._id)}
                  >
                    {user.username} ({user.role})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Transfer Type Section */}
          <div className="mb-4">
            <label className="block font-medium text-gray-800 mb-2">Transfer Type</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Deposit', value: 'deposit' },
                { label: 'Withdraw', value: 'withdraw' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                    transferType === option.value ? 'bg-yellow-400 text-white shadow-md' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="transferType"
                    value={option.value}
                    checked={transferType === option.value}
                    onChange={() => setTransferType(option.value)}
                    className="form-radio h-5 w-5 text-yellow-500 mr-2"
                  />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transfer Amount Section */}
          <div className="mb-4">
            <label className="block font-medium text-black" >Transfer Amount</label>
            <div className="flex space-x-4 mb-2">
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
              <button
                onClick={() => setAmount(0)}
                className="border border-black py-2 px-4 rounded focus:outline-none text-black"
              >
                Clear
              </button>
            </div>

            <div className="flex space-x-4">
              {[10, 20, 50, 100, 500].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount((prev) => prev + value)}
                  className="p-2 bg-gray-300 rounded text-black"
                >
                  +{value}
                </button>
              ))}
            </div>
          </div>

          {/* Transfer Note Section */}
          <div className="mb-4">
            <label className="block font-medium text-black">Transfer Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              rows="4"
              placeholder="Add a note (optional)"
            />
          </div>

          <button
            onClick={handleTransfer}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-300"
          >
            Transfer
          </button>

          {message && (
            <div className="mt-4 p-2 text-center text-red-600">{message}</div>
          )}
        </div>

        {/* Modal for Success/Error Message */}
        {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded shadow-lg max-w-xs w-full">
      <h2
        className={`text-xl font-bold ${
          modalType === 'success' ? 'text-green-500' : 'text-black' // Set error title to black
        }`}
      >
        {modalType === 'success' ? 'Success' : 'Error'}
      </h2>
      <p className="text-black">{message}</p> {/* Set the error message text to black */}
      <button
        onClick={closeModal}
        className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded w-full hover:bg-yellow-600"
      >
        Close
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default TransferForm;
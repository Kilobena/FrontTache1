import React, { useState, useEffect, useRef } from 'react';
import Auth from '../service/Auth';
import TransferService from '../service/Transfer';
import { useAuth } from '../providers/AuthContext';

const TransferForm = () => {
  const { user, updateUser } = useAuth(); // Get user and updateUser from AuthContext
  const [transferType, setTransferType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [allUsers, setAllUsers] = useState([]); // All users list
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users based on search
  const [selectedUser, setSelectedUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [modalType, setModalType] = useState(''); // for controlling success/error modal
  const [isUserListFetched, setIsUserListFetched] = useState(false); // Track if users were fetched
  const [noUsersFound, setNoUsersFound] = useState(false); // Track if no users are found

  const authServ = new Auth();
  const transferServ = new TransferService();
  const suggestionBoxRef = useRef(null);

  // Fetch users by createrId
  const fetchAllUsers = async () => {
    try {
      const response = await authServ.api.get(`/auth/usersByCreater/${user._id}`);
      if (response.data.users.length === 0) {
        setNoUsersFound(true); // Set no users message if empty
      } else {
        setAllUsers(response.data.users); // Set the user list
      }
      setIsUserListFetched(true); // Indicate that user list has been fetched
    } catch (error) {
      console.error('Error fetching users:', error);
      setNoUsersFound(true); // Treat as "No users found" if the fetch fails
      setIsUserListFetched(true); // Mark fetching as done, even in failure
    }
  };

  // Filter users based on roles and search term
  const canInteractWith = (currentRole, targetRole) => {
    const permissions = {
      partner: ['superadmin', 'admin', 'assistant', 'user'],
      superadmin: ['admin', 'assistant', 'user'],
      admin: ['assistant', 'user'],
      assistant: ['user'],
    };

    return permissions[currentRole.toLowerCase()]?.includes(targetRole.toLowerCase());
  };

  // Filter users you can interact with based on roles
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
    setShowSuggestions(false); // Hide suggestions once user is selected
  };

  useEffect(() => {
    // Fetch all users on component mount, but don't show the modal yet
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

  // Handle showing modal if no users are found when the input is focused
  const handleInputFocus = () => {
    if (isUserListFetched) {
      if (noUsersFound) {
        setModalMessage('No users found.');
        setModalType('error');
        setIsModalOpen(true); // Show modal if no users are found
      } else {
        setFilteredUsers(filteredUsersForInteraction); // Show all users on focus
        setShowSuggestions(true);
      }
    } else {
      setModalMessage('Still loading users...');
      setModalType('error');
      setIsModalOpen(true); // If data is not fetched yet, show loading message
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
      setMessage(`Transfer failed: ${result.message}`);
      setModalType('error');
      setIsModalOpen(true);
    }
  };

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
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col justify-start h-screen w-full">
        <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
          Transfer
        </h1>
        <div className="w-full max-w-lg bg-white p-6 rounded pt-7">

          {/* User Selection Input */}
          <div className="relative mb-4" ref={suggestionBoxRef}>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Search for a user"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus} // Handle input focus to show all users
            />
            {showSuggestions && filteredUsers.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 mt-1 rounded w-full z-10">
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
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
            <label className="block font-medium mb-2 text-gray-800">Transfer Type</label>
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
            <label className="block font-medium">Transfer Amount</label>
            <div className="flex space-x-4 mb-2">
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={() => setAmount(0)}
                className="border border-black py-2 px-4 rounded focus:outline-none"
              >
                Clear
              </button>
            </div>

            <div className="flex space-x-4">
              {[10, 20, 50, 100, 500].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount((prev) => prev + value)}
                  className="p-2 bg-gray-300 rounded"
                >
                  +{value}
                </button>
              ))}
            </div>
          </div>

          {/* Transfer Note Section */}
          <div className="mb-4">
            <label className="block font-medium">Transfer Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Add a note (optional)"
            />
          </div>

          <button
            onClick={handleTransfer}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
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
            <div className="bg-white p-5 rounded shadow-lg">
              <h2 className={`text-xl font-bold ${modalType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {modalType === 'success' ? 'Success' : 'Error'}
              </h2>
              <p>{message}</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded w-full"
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

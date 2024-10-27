import React, { useState, useEffect } from 'react';
import Auth from '../service/Auth';
import TransferService from '../service/Transfer';
import { useAuth } from '../providers/AuthContext';

const TransferForm = () => {
  const { user } = useAuth();
  const [transferType, setTransferType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authServ = new Auth();
  const transferServ = new TransferService();

  const handleAmountChange = (value) => {
    setAmount((prev) => prev + value);
  };

  const handleClear = () => setAmount(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await authServ.getAllUsers();
      if (result.success) {
        setUsersList(result.users);
      } else {
        console.error("Erreur lors de la récupération des utilisateurs :", result.message);
      }
    };
    fetchUsers();
  }, []);

  const canInteractWith = (role) => {
    const roleHierarchy = {
      partner: 5,
      superadmin: 4,
      admin: 3,
      assistant: 2,
      user: 1
    };
    return roleHierarchy[user.role.toLowerCase()] > roleHierarchy[role.toLowerCase()];
  };

  const filteredUsers = usersList.filter((listedUser) => {
    const canInteract = canInteractWith(listedUser.role);
    const isNotSelf = listedUser.username !== user.username;
    return canInteract && isNotSelf;
  });

  const handleTransfer = async () => {
    if (!selectedUser) {
      setMessage("Please select a user.");
      setIsModalOpen(true);
      return;
    }
    if (amount <= 0) {
      setMessage("Amount must be greater than zero.");
      setIsModalOpen(true);
      return;
    }

    const transferData = {
      senderId: user._id,
      receiverId: selectedUser,
      amount,
      type: transferType,
      note
    };

    const result = await transferServ.makeTransfer(
      transferData.senderId,
      transferData.receiverId,
      transferData.amount,
      transferData.type,
      transferData.note
    );

    if (result.success) {
      setMessage("Transfer successful!");
      setIsModalOpen(true);
      setAmount(0);
      setNote("");
      setSelectedUser(""); // Réinitialiser l'utilisateur sélectionné après un transfert réussi
    } else {
      setMessage(`Transfer failed: ${result.message}`);
      setIsModalOpen(true);
    }
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setMessage(null); // Réinitialiser le message lors de la fermeture du modal
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col justify-start h-screen w-full">
        <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
          Transfer
        </h1>
        <div className="w-full max-w-lg bg-white p-6 rounded pt-7">
          {/* User Selection */}
          <div className="relative mb-4">
            <select 
              className="block appearance-none w-full bg-white border border-black rounded p-2 text-gray-700 leading-tight focus:outline-none pr-10"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select USER</option>
              {filteredUsers.map((user) => (
                <option key={user.username} value={user._id}>
                  {user.username} ({user.role})
                </option>
              ))}
            </select>
          </div>

          {/* Transfer Type Section */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-800">Transfer Type</label>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: 'Deposit', value: 'deposit' }, { label: 'Withdraw', value: 'withdraw' }].map((option) => (
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

          {/* Transfer Note Section */}
          <div className="mb-4">
            <label className="block font-medium">Transfer Note</label>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-32"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-1/2"
              type="button"
              onClick={handleTransfer}
            >
              TRANSFER
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

        {/* Modal for Success Message */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg">
              <h2 className="text-xl font-bold">Notification</h2>
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

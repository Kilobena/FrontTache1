import React, { useState, useEffect, useRef } from 'react';
import Auth from '../service/Auth';
import TransferService from '../service/Transfer';
import { useAuth } from '../providers/AuthContext';

const TransferForm = () => {
  const { user, updateUser } = useAuth();
  const [transferType, setTransferType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const authServ = new Auth();
  const transferServ = new TransferService(); 

  const suggestionBoxRef = useRef(null);

  const handleAmountChange = (value) => {
    setAmount((prev) => prev + value);
  };

  const handleClear = () => setAmount(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await authServ.getAllUsers();
      if (result.success) {
        setUsersList(result.users);
        setFilteredUsers(result.users);
      } else {
        console.error("Error fetching users:", result.message);
      }
    };
    fetchUsers();
  }, []);

  const canInteractWith = (currentRole, targetRole) => {
    const permissions = {
      partner: ["superadmin", "admin", "assistant", "user"],
      superadmin: ["admin", "assistant", "user"],
      admin: ["assistant", "user"],
      assistant: ["user"],
    };

    const currentRoleLower = currentRole.toLowerCase();
    const targetRoleLower = targetRole.toLowerCase();

    return permissions[currentRoleLower]?.includes(targetRoleLower);
  };

  const filteredUsersForInteraction = usersList.filter((listedUser) => {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTransfer = async () => {
    if (!selectedUser) {
      setMessage("Veuillez sélectionner un utilisateur.");
      return;
    }
    if (amount <= 0) {
      setMessage("Le montant doit être supérieur à zéro.");
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
      const updatedUserResponse = await authServ.getBalance(user.username);

      if (updatedUserResponse.success) {
        const updatedUser = { ...user, balance: updatedUserResponse.balance };
        updateUser(updatedUser);
        setMessage("Transfert réussi !");
      } else {
        setMessage(`Échec de la récupération du solde mis à jour : ${updatedUserResponse.message}`);
      }

      setIsModalOpen(true);
      resetForm();
    } else {
      setMessage(`Échec du transfert : ${result.message}`);
    }
  };

  const resetForm = () => {
    setAmount(0);
    setNote("");
    setSelectedUser("");
    setSearchTerm("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage(null); 
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col justify-start h-screen w-full">
        <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
          Transfert
        </h1>
        <div className="w-full max-w-lg bg-white p-6 rounded pt-7">

          <div className="relative mb-4" ref={suggestionBoxRef}>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Rechercher un utilisateur"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
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

          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-800">Type de transfert</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Dépôt', value: 'deposit' },
                { label: 'Retrait', value: 'withdraw' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${transferType === option.value ? 'bg-yellow-400 text-white shadow-md' : 'bg-gray-100 text-gray-700'}`}
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

          <div className="mb-4">
            <label className="block font-medium">Montant du transfert</label>
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
                Effacer
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

          <div className="mb-4">
            <label className="block font-medium">Note de transfert</label>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Ajouter une note (optionnel)"
            />
          </div>

          <button 
            onClick={handleTransfer}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Transférer
          </button>

          {message && (
            <div className="mt-4 p-2 text-center text-red-600">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferForm;

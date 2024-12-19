import React, { useState, useEffect, useRef } from "react";
import Auth from "../service/Auth";
import TransferService from "../service/Transfer";
import { useAuth } from "../providers/AuthContext";
import { v4 as uuidv4 } from "uuid";

const TransferForm = () => {
  const { user, updateUser } = useAuth();
  const [transferType, setTransferType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUserListFetched, setIsUserListFetched] = useState(false);
  const [noUsersFound, setNoUsersFound] = useState(false);

  const authServ = new Auth();
  const transferServ = new TransferService();
  const suggestionBoxRef = useRef(null);

  // Fetch users based on user role
  const fetchAllUsers = async () => {
    try {
      let response;
      if (user.role === "SuperPartner") {
        response = await authServ.api.get(`/auth/getAllUsers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        response = await authServ.getUsersByCreaterId(user._id);
      }

      if (response.success && Array.isArray(response.users)) {
        setAllUsers(response.users);
        setNoUsersFound(response.users.length === 0);
      } else {
        setNoUsersFound(true);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setNoUsersFound(true);
    } finally {
      setIsUserListFetched(true);
    }
  };

  const canInteractWith = (currentRole, targetRole) => {
    const permissions = {
      partner: ["superadmin", "admin", "assistant", "user"],
      superadmin: ["admin", "assistant", "user"],
      admin: ["assistant", "user"],
      assistant: ["user"],
    };
    if (currentRole === "SuperPartner") {
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
    
    setShowSuggestions(true);
  };

  useEffect(() => {
    fetchAllUsers();

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
    if (!selectedUser || amount <= 0) {
      setMessage("Please select a valid user and amount.");
      return;
    }

    const transactionId = uuidv4();

    const transferData = {
      transaction_id: transactionId,
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
        transferData.note,
        transferData.transaction_id
      );

      if (result.success) {
        const updatedUserResponse = await authServ.getBalance(user.username);
        if (updatedUserResponse.success) {
          updateUser({ ...user, balance: updatedUserResponse.balance });
          setMessage("Transfer successful!");
        }
      } else {
        setMessage(result.message || "Transfer failed.");
      }
    } catch (error) {
      setMessage("An error occurred during transfer.");
    }
  };

  const resetForm = () => {
    setAmount(0);
    setNote("");
    setSelectedUser("");
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col flex flex-col">
      <header className="bg-[#474747] font-bold text-agentToolHeaderText bg-agentToolHeaderBg rounded-lg py-3 px-4 text-lg text-center ltr:lg:text-left rtl:lg:text-right lg:text-2xl">
        <h1 className="text-3xl font-bold">Transfer</h1>
      </header>

      <div className="flex-1 pt-8">
        <div className="max-w-lg  rounded-lg ">
          {/* User Selection Input */}
          <div className="relative mb-4" ref={suggestionBoxRef}>
            <span className="font-medium text-[#242424] ml-2">Search for user</span>
            <input
              type="text"
              className="border-slate-800 border p-1.5 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              placeholder="Type the First 3 letters"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {message && <p className="text-red-600 mt-2">{message}</p>}
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
            <label className="block font-medium ml-2 text-[#242424] mb-2">Transfer Type</label>
            <div className="grid grid-cols-2">
              {[{ label: "Deposit", value: "deposit" }, { label: "Withdraw", value: "withdraw" }].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center p-2  cursor-pointer transition transform  ${
                    transferType === option.value
                      ? "bg-yellow-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.username} ({user.role})
                </label>
              ))}
            </div>
          </div>

          {/* Transfer Amount Section */}
          <div className="mb-4">
            <label className="block font-medium ml-2 text-[#242424]">Transfer Amount</label>
            <div className="flex space-x-4 mb-2">
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full p-2 border border-slate-800 rounded text-black"
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
                  className="flex-1 p-2 bg-gray-300 rounded text-black"
                >
                  +{value}
                </button>
              ))}
            </div>
          </div>

          {/* Transfer Note Section */}
          <div className="mb-4">
            <label className="block font-medium ml-2 text-[#242424]">Transfer Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              rows="4"
              placeholder="Add a note (optional)"
            />
          </div>

          <button
            onClick={handleTransfer}
            className="w-full font-semibold bg-yellow-500 text-black px-5 py-3 rounded-lg hover:bg-[#ccaa00] transition duration-300"
          >
            TRANSFER
          </button>
          <button
            onClick={handleTransfer}
            className="w-full a k mt-3 font-semibold border border-slate-800 bg-white text-black px-5 py-3 rounded-lg hover:bg-[#e2e2e2] transition duration-300"
          >
            RESET
          </button>

          {message && <div className="mt-4 p-2 text-center text-red-600">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default TransferForm;

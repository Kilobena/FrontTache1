import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../providers/AuthContext";
import Auth from "../../service/Auth";
import TransferService from "../../service/Transfer";

const TransferForm = () => {
  const { user, updateUser } = useAuth();
  const [transferType, setTransferType] = useState("deposit");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUserListFetched, setIsUserListFetched] = useState(false);

  const authServ = new Auth();
  const transferServ = new TransferService();
  const suggestionBoxRef = useRef(null);

  // Fetch users based on role hierarchy
  const fetchUsers = async () => {
    try {
      let response;
  
      if (user.role === "Owner") {
        response = await authServ.api.get(`/auth/getAllUsers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        response = await authServ.getUsersByCreaterId(user._id);
      }
  
      console.log("Fetched users full response:", response);
  
      // Validate response structure
      const data = response.data || response;
      if (data && data.success && Array.isArray(data.users)) {
        const users = data.users;
        setAllUsers(users);
  
        const filteredUsers = users.filter((u) => {
          const canInteract = canInteractWith(user.role, u.role);
          const isCreatedBy =
            user.role === "Owner" || String(u.createrid) === String(user._id);
          const isNotSelf = u.username !== user.username;
  
          console.log("User Filtering Debug:", {
            username: u.username,
            role: u.role,
            createrid: u.createrid,
            canInteract,
            isCreatedBy,
            isNotSelf,
          });
  
          return canInteract && isCreatedBy && isNotSelf;
        });
  
        console.log("Filtered Users:", filteredUsers);
  
        if (filteredUsers.length === 0) {
          setMessage("No users found.");
        } else {
          setFilteredUsers(filteredUsers);
        }
      } else {
        console.error("Unexpected response structure:", response);
        setMessage("No users found.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
  
      // Handle token expiration or invalid token (401)
      if (error.response?.status === 401) {
        setMessage("Authorization failed. Please log in again.");
        // Optional: Redirect to login page
        // navigate("/login");
      } else {
        setMessage("Error fetching users. Please try again later.");
      }
    } finally {
      setIsUserListFetched(true);
    }
  };
  
  
  
  
  

  // Role-based interaction logic
  const canInteractWith = (currentRole, targetRole) => {
    const permissions = {
      Owner: ["Partner", "SuperAgent", "Agent", "User"],
      Partner: ["SuperAgent"],
      SuperAgent: ["Agent"],
      Agent: ["User"],
      User: [], // Users cannot interact
    };

    return permissions[currentRole]?.includes(targetRole) || false;
  };

  // Search functionality
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.length >= 3) {
      setShowSuggestions(true);
  
      // Use the original `allUsers` list for filtering
      const filtered = allUsers.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
  
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
      setShowSuggestions(false);
    }
  };
  

  const handleSuggestionClick = (username, userId) => {
    setSearchTerm(username);
    setSelectedUser(userId);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (!isUserListFetched) {
      setMessage("Loading users...");
    }
  };

  useEffect(() => {
    fetchUsers();

    const handleClickOutside = (event) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target)
      ) {
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
      console.error("Error during transfer:", error);
      setMessage("An error occurred during transfer.");
    }
  };

  const resetForm = () => {
    setAmount(0);
    setNote("");
    setSelectedUser("");
    setSearchTerm("");
    setFilteredUsers([]);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col">
      <header className="bg-[#474747] font-bold text-agentToolHeaderText bg-agentToolHeaderBg rounded-lg py-3 px-4 text-lg text-center ltr:lg:text-left rtl:lg:text-right lg:text-2xl">
        <h1 className="lg:text-2xl font-bold">Transfer</h1>
      </header>

      <div className="flex-1 pt-8">
        <div className="max-w-lg rounded-lg">
          {/* User Selection Input */}
          <div className="relative mb-4" ref={suggestionBoxRef}>
            <span className="font-medium text-[#242424] ml-2">
              Search for user
            </span>
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
                    onClick={() =>
                      handleSuggestionClick(user.username, user._id)
                    }
                  >
                    {user.username} ({user.role}) ({user.balance} dt)
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Transfer Type Section */}
          <div className="mb-4">
            <label className="block font-medium ml-2 text-[#242424] mb-2">
              Transfer Type
            </label>
            <div className="grid grid-cols-2 overflow-hidden">
              {[
                { label: "Deposit", value: "deposit" },
                { label: "Withdraw", value: "withdraw" },
              ].map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => setTransferType(option.value)}
                  className={`flex items-center p-3 cursor-pointer transition transform ${
                    transferType === option.value
                      ? "bg-yellow-500 text-sm font-semibold text-black shadow-md"
                      : "bg-[#e2e2e2] text-sm text-black font-semibold"
                  } ${
                    index === 0
                      ? "rounded-tl-lg rounded-bl-lg"
                      : "rounded-tr-lg rounded-br-lg"
                  }`}
                >
                  <input
                    type="radio"
                    name="transferType"
                    value={option.value}
                    checked={transferType === option.value}
                    onChange={(e) => {
                      e.stopPropagation();
                      setTransferType(option.value);
                    }}
                    className="mr-2"
                  />
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          {/* Transfer Amount Section */}
          <div className="mb-4">
            <label className="block font-medium ml-2 text-[#242424]">
              Transfer Amount
            </label>
            <div className="flex space-x-4 mb-2">
              <input
                type="button"
                value={amount}
                readOnly
                className="text-left w-full p-2 border border-slate-800 rounded text-black"
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
            <label className="block font-medium ml-2 text-[#242424]">
              Transfer Note
            </label>
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
            onClick={resetForm}
            className="w-full mt-3 font-semibold border border-slate-800 bg-white text-black px-5 py-3 rounded-lg hover:bg-[#e2e2e2] transition duration-300"
          >
            RESET
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

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../providers/AuthContext";
import Auth from "../../service/Auth";
import Select from "react-select";
import SelectDropDown from "../../components/ui/SelectDropDown";


const ManageUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores filtered users to display in the table
  const [allUsers, setAllUsers] = useState([]);
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [showNoUsersMessage, setShowNoUsersMessage] = useState(false);
  const [isUserListFetched, setIsUserListFetched] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const [selectedSuperAgentOption, setSuperAgentSelectedOption] = useState(null);

  const authApi = new Auth();
  const { user } = useAuth();
  const authServ = new Auth();

  const inputRef = useRef(null);
  const suggestionBoxRef = useRef(null);

  const fetchAllUsers = async () => {
    try {
      let response;
      if (user.role === "Owner") {
        response = await authServ.getAllUsers();
      } else {
        response = await authServ.getUsersByCreatorId(user._id);
      }

      console.log("API response:", response);

      if (response.success && Array.isArray(response.users)) {
        setAllUsers(response.users);
        setNoUsersFound(response.users.length === 0);
        setIsUserListFetched(true);
      } else {
        setNoUsersFound(true);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setNoUsersFound(true);
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

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);

  //   if (value) {
  //     const filtered = allUsers.filter((user) =>
  //       user.username.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setSuggestions(filtered);
  //     setShowNoUsersMessage(filtered.length === 0);
  //   } else {
  //     setSuggestions([]);
  //     setShowNoUsersMessage(false);
  //   }
  // };

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



  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "gray" : "black",
      borderRadius: "0.375rem",
      "&:hover": {
        borderColor: "gray", // Optional: set border color on hover
      },
    }),
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption); // Track selected value
  };
  const dummySuggestions = [
    { _id: "1", username: "john_doe", role: "Admin" },
    { _id: "2", username: "jane_smith", role: "Editor" },
    { _id: "3", username: "samuel_green", role: "Viewer" },
    { _id: "4", username: "lucy_brown", role: "Admin" },
    { _id: "5", username: "emma_white", role: "Editor" },
  ];
  const filteredOptions = dummySuggestions.map((suggestion) => ({
    value: suggestion._id,
    label: suggestion.role, // Display role in the input
    username: suggestion.username,
  }));


  // super agent
  const handleSuperAgentChange = (option) => {
    setSuperAgentSelectedOption(option);
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };
  const options = [
    { value: "agent", label: "Agent" },
    { value: "superagent", label: "Super Agent" },
    { value: "opetator", label: "Opetator" },
    { value: "partner", label: "Partner" },
    { value: "player", label: "Player" },
  ];
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="rounded-lg bg-[#474747] text-white w-full p-3">
        <h1 className="text-2xl font-bold">Manage Users</h1>
      </header>

      <div className="flex-1 overflow-auto pt-5">
        <div className="w-full lg:flex  rounded-lg">
          {/* Search Input */}
          {/* <div className="relative mb-4" ref={suggestionBoxRef}>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
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
                    className="p-2 cursor-pointer hover:bg-gray-200 text-black"
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
          </div> */}
          <div className="relative mb-4 w-full lg:max-w-80 " ref={suggestionBoxRef}>
            <label
              htmlFor="user-select"
              className="block text-md ml-3  text-[#242424]"
            >
              Role
            </label>
            <Select
              id="user-select"
              options={filteredOptions}
              placeholder="Enter username"
              onChange={handleSelectChange}
              // inputValue={searchTerm}
              onInputChange={handleInputChange}
              styles={customStyles}
              isClearable={false}
              isSearchable={false}
              className="focus:outline-white focus:ring-white ring-white text-black rounded-sm mt-1"
              />
          </div>
          {selectedValue &&
            <>

              <div className="relative mb-4 lg:ml-3 w-full lg:max-w-72 " ref={suggestionBoxRef}>
              <SelectDropDown label="Super Agent" selectedOption={selectedSuperAgentOption} ref={selectRef} styles={customStyles} options={options} handleChange={handleSuperAgentChange} />

              </div>
              <div className="relative mb-4 lg:ml-3 w-full lg:max-w-72 " ref={suggestionBoxRef}>
              <SelectDropDown label="Agent" selectedOption={selectedSuperAgentOption} ref={selectRef} styles={customStyles} options={options} handleChange={handleSuperAgentChange} />

              </div>

              <div className="relative mb-4 lg:ml-3 w-full lg:max-w-72 " ref={suggestionBoxRef}>
              <SelectDropDown label="Agent" selectedOption={selectedSuperAgentOption} ref={selectRef} styles={customStyles} options={options} handleChange={handleSuperAgentChange} />

              </div>
            </>
          }



          {/* Action Buttons */}
        </div>
        <div className="lg:flex gap-3 mt-7 w-full lg:max-w-sm">
          <button
            disabled={!selectedValue} // Disable button if no value is selected
            className={`bg-yellow-500 lg:max-w-32 rounded-lg text-md text-black font-bold py-2 px-4 w-full ${selectedValue
              ? "hover:bg-yellow-600"
              : "opacity-50 cursor-not-allowed"
              }`}
            type="button"
            onClick={handleSearch}
          >
            SEARCH
          </button>
          <button
            className="border border-black mt-4 sm:mt-0  md:ml-4 lg:max-w-32 rounded-lg text-md hover:bg-gray-300 text-gray-700 font-bold py-2 px-4  w-full"
            type="reset"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
        <hr className="border-t mt-5 mb-3 border-[#d4c8c8a3]" />



        {/* Display the user list table if there are filtered users */}
        {filteredUsers.length > 0 ?
        <>
        <div class="pb-3"><span class="flex text-sm text-black">Sort by:</span>
          <label for="sortByUser" class="space-x-2 pr-3 ml-2">
          <input type="radio" name="sortByBalances" id="sortByUser" value="alphabetically" class="focus:ring-2 peer focus:ring-blue-500"/>
            <span className="text-black text-lg font-semibold">Alphabetically</span></label>
          <label for="sortByBalance" class="space-x-2">
            <input type="radio" name="sortByBalances" id="sortByBalance" value="alphabetically"  /><span className="text-black text-lg font-semibold">Balance</span>
          </label></div>
        <div className="overflow-x-scroll lg:overflow-x-auto w-full">
          <table className="w-full table-auto agent-table  border border-gray-300 ">
            <thead className="bg-[#474747] font-medium text-sm">
              <tr className=" ">
                <th className="py-2 text-left px-4 border">User</th>
                <th className="py-2 px-4 border text-center">Role</th>
                <th className="py-2 px-4 border text-center">Balanace</th>
                <th className="py-2 px-4 border text-center">Network Balance</th>
                <th className="py-2 px-4 border text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-black text-sm items-center">
              {/* {filteredUsers.map((user) => (
                <tr key={user._id} className="bg-black">
                <td className="py-2 px-4 border text-center">
                {user.username}
                </td>
                <td className="py-2 px-4 border text-center">
                {user.role}
                      </td>
                      <td className="py-2 px-4 border text-center">
                      <button className="bg-red-500 text-white px-2 py-1 rounded">
                          Delete
                        </button>
                        </td>
                        </tr>
                      ))} */}
              <tr>
                <td className="border text-center border-gray-300 font-bold">asbettest</td>
                <td className="border text-center border-gray-300">Super Agent</td>
                <td className="border text-right py-2 px-4 border-gray-300">0.00 TND</td>
                <td className="border text-right py-2 px-4 border-gray-300">0.00 TND</td>

                <td className="text-right border border-gray-300 flex justify-center  agent-actions  items-center py-1  agent-actions-186100010260">
                  <span className="flex justify-center flex-grow-0 items-center gap-2 pl-5 pr-5 hover:bg-[#f2c41a] text-md text-[#242424] focus:outline-none rounded-lg bg-white border border-black mx-1 max-w-40 w-full  py-1"><svg width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path d="M11.8071 3.48486L9.55712 1.23486C9.44987 1.12761 9.28899 1.09611 9.14837 1.15348C9.00812 1.21161 8.91699 1.34848 8.91699 1.49998V2.62498H3.29199C2.67062 2.62498 2.16699 3.12861 2.16699 3.74998C2.16699 4.37136 2.67062 4.87498 3.29199 4.87498H8.91699V5.99998C8.91699 6.15148 9.00812 6.28836 9.14837 6.34648C9.28937 6.40461 9.45024 6.37198 9.55712 6.26511L11.8071 4.01511C11.9537 3.86886 11.9537 3.63111 11.8071 3.48486Z"></path><path d="M10.0418 7.12491H4.4168V5.99991C4.4168 5.84841 4.32568 5.71153 4.18543 5.65341C4.04518 5.59528 3.8843 5.62716 3.77668 5.73478L1.52668 7.98478C1.38043 8.13103 1.38043 8.36878 1.52668 8.51503L3.77668 10.765C3.88355 10.8719 4.04443 10.9045 4.18543 10.8464C4.32568 10.7883 4.4168 10.6514 4.4168 10.4999V9.37491H10.0418C10.6632 9.37491 11.1668 8.87128 11.1668 8.24991C11.1668 7.62853 10.6632 7.12491 10.0418 7.12491Z"></path></svg><span>Transfer</span></span>
                  <span className="flex justify-center items-center gap-2 pl-5 pr-5 hover:bg-[#f2c41a] focus:outline-none rounded-lg bg-white border border-black mx-1 max-w-40 w-full  py-1"><svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><path d="M6.83398 3.75C6.42073 3.75 6.08398 3.41325 6.08398 3V0H1.58398C1.17073 0 0.833984 0.33675 0.833984 0.75V11.25C0.833984 11.664 1.17073 12 1.58398 12H9.08398C9.49798 12 9.83398 11.664 9.83398 11.25V3.75H6.83398ZM3.83398 10.5H2.33398V8.25H3.83398V10.5ZM6.08398 10.5H4.58398V6.75H6.08398V10.5ZM8.33398 10.5H6.83398V5.25H8.33398V10.5Z"></path></svg><span>Report</span></span>
                  <span className=" flex justify-center flex-grow-1 items-center gap-1 pl-5 pr-5 hover:bg-[#f2c41a] focus:outline-none rounded-lg bg-white border border-black mx-1 max-w-56 w-full py-1"> <svg width="18" height="18" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M288 416v-96a128 128 0 0 1 256 0v96h64v-96c0-106-86-192-192-192s-192 86-192 192v96zM512 704h-64v-64l384-384 64 64-384 384z"></path><path d="M544 736H416V608l160-160H192a64.19 64.19 0 0 0-64 64v320a64.19 64.19 0 0 0 64 64h448a64.19 64.19 0 0 0 64-64V576z"></path></svg><span>Change Password</span></span>
                </td>
              </tr>
             

            </tbody>
            <tfoot class="bg-[#808080]  text-white text-sm text-left font-semibold uppercase py-2 px-4">
              <tr><th class="text-left py-2 px-4" colspan="2">Total <span class="lowercase font-normal">(2 Players)</span></th>
                <th class="text-right border py-2 px-4 border-gray-300">0.00 TND</th><th colspan="2"></th>
              </tr></tfoot>
          </table>

        </div>
          <div class="tickets-pagination flex flex-wrap mt-6 lg:my-6 items-center flex-col lg:flex-row">
            <div class="text-sm text-[#242424] text-center ltr:lg:text-left rtl:lg:text-right py-2 lg:py-0">Showing 1 to 2 of 2 entries</div>
            </div>
        {/* </div> */}
                      </>
          : <div class="flex flex-col items-center justify-center py-6 px-3 my-7">
            <i class="fa fa-search text-slate-600 bg-[#EDEEF5] p-9 rounded-md fa-3x" aria-hidden="true"></i>
            <span class="text-lg sm:text-xl mt-8 mb-4 text-[#474747] text-center w-full max-w-[300px]">Search all available records by selecting one of the filters above!</span></div>} 

        {/* Show "No users found" message if applicable */}
        {showNoUsersMessage && filteredUsers.length === 0 && (
          <div class="flex flex-col items-center justify-center py-6 px-3 my-7">
          <i class="fa fa-search text-slate-600 bg-[#EDEEF5] p-9 rounded-md fa-3x" aria-hidden="true"></i>
          <span class="text-lg sm:text-xl mt-8 mb-4 text-[#474747] text-center w-full max-w-[300px]">We could not find any records matching your search queries!</span></div>

        )}
      </div>
    </div>
  );
};

export default ManageUser;

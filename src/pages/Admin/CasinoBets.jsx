import React, { useState, useRef } from "react";
import Select from "react-select";
import SelectDropDown from "../../components/ui/SelectDropDown";
import CustomDateRangePicker from "../../components/ui/DateRangePicker";
import { format } from "date-fns";

const CasinoBets = () => {
  const selectRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState("today");
  const [chosenDate, setChosenDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("Super Agent");
  const [transfers, setTransfers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedSuperAgentOption, setSuperAgentSelectedOption] = useState(null);
  const [dateRangeState, setDateRangeState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
  const dateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "7days" },
    { label: "This Month", value: "month" },
    {
      label: (
        <span className="flex justify-between items-center">
          Custom: Choose Date<i class="fa fa-calendar" aria-hidden="true"></i>
        </span>
      ),
      value: "custom",
    },
  ];

  const options = [
    { value: "agent", label: "Agent" },
    { value: "superagent", label: "Super Agent" },
    { value: "opetator", label: "Opetator" },
    { value: "partner", label: "Partner" },
    { value: "player", label: "Player" },
  ];
  const handleSuperAgentChange = (option) => {
    setSuperAgentSelectedOption(option);
    if (selectRef.current) {
      selectRef.current.blur();
    }
  };
  const productOptions = [
    { username: "Any", value: "any" },
    { username: "Casino", value: "casino" },
    { username: "Sportsbook", value: "sportsbook" },
  ];
  const productOptionsMap = productOptions.map((userOption) => ({
    value: userOption.value,
    label: userOption.username,
  }));
  const handleSelectTransOptChange = (selectedOption) => {
    setSelectedUser(selectedOption.value); // Update selected value
    console.log("Selected User:", selectedOption);
  };

  return (
    <div className="flex flex-col  w-full trasnfer-history">
      {" "}
      {/* Ensure full height */}
      <header className="rounded-lg bg-[#474747] text-white w-full p-3">
        <h1 className="text-2xl font-bold">Casino Bets</h1>
      </header>
      <div className="flex-1 sm:pt-3">
        <div className="w-full    rounded-lg ">
          {/* Date Filter Section */}
          <div className="mb-8 mt-3 sm:mt-0">
            <label className="block font-normal ml-2  text-gray-800 text-lg">Transaction Date</label>
            <div className="flex flex-wrap gap-2 sm:gap-0 w-full">
              {dateOptions.map((option, index) => (
                <label
                  key={option.value}
                  className={`flex md:flex-1 w-full md:gap-3 items-center ml-0.5 p-2.5 cursor-pointer md:first:rounded-tlmd:-lg first:rounded-bl-lg md:last:rounded-tr-lg md:last:rounded-br-lg  ${
                    selectedDate === option.value ? "bg-yellow-400 text-black shadow-md" : "bg-[#e2e2e2] text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="transactionDate"
                    value={option.value}
                    checked={selectedDate === option.value}
                    onChange={() => {
                      setSelectedDate(option.value);
                      if (option.value !== "custom") {
                        setChosenDate("");
                      }
                    }}
                    className="form-radio h-3 w-3"
                  />
                  <span className="font-bold text-sm ml-2 w-full">
                    {selectedDate === option.value && option.value === "custom" ? (
                      <span>
                        Custom: {`${format(dateRangeState[0]?.startDate, "dd-MM-yyyy")} - ${format(dateRangeState[0]?.endDate, "dd-MM-yyyy")}`}
                      </span>
                    ) : (
                      option.label
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Date Picker Section */}
          {selectedDate === "custom" && (
            <div className="mb-8">
              <div className="flex flex-row justify-center gap-4">
                {/* Calendar Months */}
                <CustomDateRangePicker dateRangeState={dateRangeState} setDateRangeState={setDateRangeState} />
              </div>
              {/* Buttons */}
              <div className="flex justify-center mt-4 space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-11 rounded-lg">CLOSE</button>
                <button className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-11 rounded-lg">CLEAR</button>
              </div>
              {/* <label className="block font-medium mb-2 text-gray-800 text-lg">
                Select a Date
              </label>
              <input
                type="date"
                value={chosenDate}
                onChange={(e) => setChosenDate(e.target.value)}
                max={today}
                className="p-2 border border-gray-300 rounded bg-white w-full"
              /> */}
            </div>
          )}

          {/* Transfer To / From Selection Section */}
          {/* <div className="flex flex-wrap justify-center"> */}
          <div className="flex flex-col lg:flex-row space-x-0 space-y-2 lg:space-x-2 lg:space-y-0 w-full rtl:space-x-reverse">
            <div
              className="flex flex-row lg:flex-row w-full 
                    flex-wrap gap-3 rtl:space-x-reverse"
            >
              <div className=" w-full sm:w-[10%] lg:w-[48%] 2xl:w-[32%]">
                <label htmlFor="user-select" className="block text-md ml-3  text-[#242424]">
                  Prooduct
                </label>

                <Select
                  options={productOptionsMap}
                  onChange={handleSelectTransOptChange}
                  placeholder="Select an option"
                  styles={customStyles}
                  isSearchable
                  className="text-black text-sm custom-focus-reset border  shadow-none rounded-md mt-1 !focus:outline-none !focus:ring-0"
                />
              </div>
              <div className=" w-[100%]   sm:w-[10%] lg:w-[48%] 2xl:w-[31%]">
                <SelectDropDown
                  label="Game"
                  selectedOption={selectedSuperAgentOption}
                  ref={selectRef}
                  styles={customStyles}
                  options={options}
                  handleChange={handleSuperAgentChange}
                />
              </div>
              <div className=" w-[100%]   sm:w-[10%] lg:w-[48%] 2xl:w-[31%]">
                <label className="block text-md ml-3  text-[#242424]">Bet Id</label>
                <input
                  name="betID"
                  id="betID"
                  autocomplete="false"
                  data-1p-ignore="true"
                  className="text-black w-full rounded border-black mt-1 px-2 py-1.5"
                />
              </div>

              <div className=" w-[100%]    sm:w-[10%] lg:w-[48%] 2xl:w-[31%]">
                <SelectDropDown
                  label="Super Agent"
                  selectedOption={selectedSuperAgentOption}
                  ref={selectRef}
                  styles={customStyles}
                  options={options}
                  handleChange={handleSuperAgentChange}
                />
              </div>
              <div className=" w-[100%]   sm:w-[10%] lg:w-[48%] 2xl:w-[31%]">
                <SelectDropDown
                  label="Agent"
                  selectedOption={selectedSuperAgentOption}
                  ref={selectRef}
                  styles={customStyles}
                  options={options}
                  handleChange={handleSuperAgentChange}
                />
              </div>
              <div className=" w-[100%]   sm:w-[10%] lg:w-[48%] 2xl:w-[31%]">
                <SelectDropDown
                  label="Player"
                  selectedOption={selectedSuperAgentOption}
                  ref={selectRef}
                  styles={customStyles}
                  options={options}
                  handleChange={handleSuperAgentChange}
                />
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="lg:flex gap-3 mb-8 mt-7">
            <button className="bg-yellow-500 hover:bg-yellow-600 p-2  text-black w-full lg:max-w-40 font-bold lg:py-2 px-11 rounded-lg" type="button">
              SEARCH
            </button>
            <button
              className="border border-black hover:bg-gray-300 p-2 mt-4 sm:mt-0  text-gray-700 lg:max-w-40 font-bold w-full lg:py-2 px-11 rounded-lg"
              type="reset"
              onClick={() => {
                setSelectedDate("today");
                setChosenDate("");
                setTransfers([]);
                setErrorMessage(null);
              }}
            >
              RESET
            </button>
          </div>

          <hr className="border-t mt-5 mb-3 border-[#d4c8c8a3]" />

          {/* Transfer History Display */}
          {errorMessage ? (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          ) : transfers.length > 0 ? (
            <>
              <div class="pb-3">
                <span class="flex text-sm text-black">Sort by:</span>
                <label for="sortByUser" class="space-x-2 pr-3 ml-2">
                  <input type="radio" name="sortByBalances" id="sortByUser" value="alphabetically" class="focus:ring-2 peer focus:ring-blue-500" />
                  <span className="text-black text-lg font-semibold">Alphabetically</span>
                </label>
                <label for="sortByBalance" class="space-x-2">
                  <input type="radio" name="sortByBalances" id="sortByBalance" value="alphabetically" />
                  <span className="text-black text-lg font-semibold">Balance</span>
                </label>
              </div>
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
                    {/* {transfers.map((transfer, index) => (
                    <tr key={index} className="hover:bg-black-100">
                      <td className="border px-4 py-2 text-center">{transfer.type}</td>
                      <td className="border px-4 py-2 text-center">{transfer.amount}</td>
                      <td className="border px-4 py-2 text-center">{new Date(transfer.date).toLocaleString()}</td>
                      <td className="border px-4 py-2 text-center">
                        {transfer.senderId ? `${transfer.senderId.username} (${transfer.senderId.role})` : "Unknown Sender"}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {transfer.receiverId ? `${transfer.receiverId.username} (${transfer.receiverId.role})` : "Unknown Receiver"}
                      </td>
                    </tr>
                  ))} */}
                    <tr>
                      <td className="border text-center border-gray-300 font-bold">asbettest</td>
                      <td className="border text-center border-gray-300">Super Agent</td>
                      <td className="border text-right py-2 px-4 border-gray-300">0.00 TND</td>
                      <td className="border text-right py-2 px-4 border-gray-300">0.00 TND</td>

                      <td className="text-right border border-gray-300 flex justify-center  agent-actions  items-center py-1  agent-actions-186100010260">
                        <span className="flex justify-center flex-grow-0 items-center gap-2 pl-5 pr-5 hover:bg-[#f2c41a] text-md text-[#242424] focus:outline-none rounded-lg bg-white border border-black mx-1 max-w-40 w-full  py-1">
                          <svg width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.8071 3.48486L9.55712 1.23486C9.44987 1.12761 9.28899 1.09611 9.14837 1.15348C9.00812 1.21161 8.91699 1.34848 8.91699 1.49998V2.62498H3.29199C2.67062 2.62498 2.16699 3.12861 2.16699 3.74998C2.16699 4.37136 2.67062 4.87498 3.29199 4.87498H8.91699V5.99998C8.91699 6.15148 9.00812 6.28836 9.14837 6.34648C9.28937 6.40461 9.45024 6.37198 9.55712 6.26511L11.8071 4.01511C11.9537 3.86886 11.9537 3.63111 11.8071 3.48486Z"></path>
                            <path d="M10.0418 7.12491H4.4168V5.99991C4.4168 5.84841 4.32568 5.71153 4.18543 5.65341C4.04518 5.59528 3.8843 5.62716 3.77668 5.73478L1.52668 7.98478C1.38043 8.13103 1.38043 8.36878 1.52668 8.51503L3.77668 10.765C3.88355 10.8719 4.04443 10.9045 4.18543 10.8464C4.32568 10.7883 4.4168 10.6514 4.4168 10.4999V9.37491H10.0418C10.6632 9.37491 11.1668 8.87128 11.1668 8.24991C11.1668 7.62853 10.6632 7.12491 10.0418 7.12491Z"></path>
                          </svg>
                          <span>Transfer</span>
                        </span>
                        <span className="flex justify-center items-center gap-2 pl-5 pr-5 hover:bg-[#f2c41a] focus:outline-none rounded-lg bg-white border border-black mx-1 max-w-40 w-full  py-1">
                          <svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.83398 3.75C6.42073 3.75 6.08398 3.41325 6.08398 3V0H1.58398C1.17073 0 0.833984 0.33675 0.833984 0.75V11.25C0.833984 11.664 1.17073 12 1.58398 12H9.08398C9.49798 12 9.83398 11.664 9.83398 11.25V3.75H6.83398ZM3.83398 10.5H2.33398V8.25H3.83398V10.5ZM6.08398 10.5H4.58398V6.75H6.08398V10.5ZM8.33398 10.5H6.83398V5.25H8.33398V10.5Z"></path>
                          </svg>
                          <span>Report</span>
                        </span>
                        <span className=" flex justify-center flex-grow-1 items-center gap-1 pl-5 pr-5 hover:bg-[#f2c41a] focus:outline-none rounded-lg bg-white border border-black mx-1 max-w-56 w-full py-1">
                          {" "}
                          <svg width="18" height="18" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M288 416v-96a128 128 0 0 1 256 0v96h64v-96c0-106-86-192-192-192s-192 86-192 192v96zM512 704h-64v-64l384-384 64 64-384 384z"></path>
                            <path d="M544 736H416V608l160-160H192a64.19 64.19 0 0 0-64 64v320a64.19 64.19 0 0 0 64 64h448a64.19 64.19 0 0 0 64-64V576z"></path>
                          </svg>
                          <span>Change Password</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="bg-[#808080]  text-white text-sm text-left font-semibold uppercase py-2 px-4">
                    <tr>
                      <th class="text-left py-2 px-4" colspan="2">
                        Total <span class="lowercase font-normal">(2 Players)</span>
                      </th>
                      <th class="text-right border py-2 px-4 border-gray-300">0.00 TND</th>
                      <th colspan="2"></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="tickets-pagination flex flex-wrap mt-6 lg:my-6 items-center flex-col lg:flex-row">
                <div class="text-sm text-[#242424] text-center ltr:lg:text-left rtl:lg:text-right py-2 lg:py-0">Showing 1 to 2 of 2 entries</div>
              </div>
            </>
          ) : (
            <div class="flex flex-col items-center justify-center py-6 px-3 my-7">
              <i class="fa fa-search text-slate-600 bg-[#EDEEF5] p-9 rounded-md fa-3x" aria-hidden="true"></i>
              <span class="text-lg sm:text-xl mt-8 mb-4 text-[#474747] text-center w-full max-w-[300px]">
                Search all available records by selecting one of the filters above!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CasinoBets;

import React, { useState } from "react";
import { format } from "date-fns";
import CustomDateRangePicker from "../../../components/ui/DateRangePicker";
import { useLocation } from "react-router-dom";

const SelectedTransactionDates = ({ setShowTransferHistoryData, setSelectedDate, selectedDate, title }) => {
  const [isDatePickerClose, setDatePickerClose] = useState(false);
  const [chosenDate, setChosenDate] = useState("");
  const [dateRangeState, setDateRangeState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const location = useLocation();
  console.log(location.pathname, "Ssss");
  const handleCloseDate = () => {
    setDatePickerClose(false);
    setShowTransferHistoryData(false);
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
  return (
    <>
      <div className="mb-4">
        <label className="block font-normal ml-2  text-gray-800 text-[17px]">{title}</label>
        <div className="flex flex-wrap gap-1 sm:gap-0 lg:w-full">
          {dateOptions.map((option, index) => (
            <label
              key={option.value}
              className={`flex md:flex-1 lg:w-full lg:min-w-[11rem] lg:last:min-w-[24rem] md:gap-3 items-center ml-0.5 p-2.5 cursor-pointer first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg rounded-lg sm:rounded-none   
                ${selectedDate === option.value ? "bg-yellow-400 text-black shadow-md" : "bg-[#e2e2e2] text-gray-700"}  
                ${location.pathname === "/agent/transfer-history" && index !== 4 ? "w-[48.9%] gap-1" : "w-full"}
                                `}
            >
              <input
                type="radio"
                name="transactionDate"
                value={option.value}
                checked={selectedDate === option.value}
                onChange={() => {
                  setSelectedDate(option.value);
                  setDatePickerClose(true);
                  if (option.value !== "custom") {
                    setChosenDate("");
                  }
                }}
                className="form-radio h-3 w-3"
              />
              <span className="font-bold text-sm w-full">
                {selectedDate === option.value && option.value === "custom" && dateRangeState[0]?.endDate ? (
                  <span>Custom: {`${format(dateRangeState[0]?.startDate, "dd-MM-yyyy")} - ${format(dateRangeState[0]?.endDate, "dd-MM-yyyy")}`}</span>
                ) : (
                  option.label
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {selectedDate === "custom" && (
        <div className="mb-8">
          {isDatePickerClose && (
            <>
              <div className="flex flex-row justify-center gap-4">
                <CustomDateRangePicker dateRangeState={dateRangeState} setDateRangeState={setDateRangeState} />
              </div>

              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-11  rounded-lg"
                  disabled={!selectedDate}
                  onClick={handleCloseDate}
                >
                  CLOSE
                </button>
                <button className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-11 rounded-lg">CLEAR</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default SelectedTransactionDates;

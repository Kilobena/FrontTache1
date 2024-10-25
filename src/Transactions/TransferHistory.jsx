import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransferHistory = () => {
  const [selectedDate, setSelectedDate] = useState('today');
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full h-full bg-white p-8">
        <h1 className="text-3xl font-bold mb-8 bg-gray-700 text-white p-4 rounded w-full">
          Transfer History
        </h1>
        
        {/* Transaction Date Section */}
        <div className="mb-8">
          <label className="block font-medium mb-4 text-gray-800 text-lg">
            Transaction Date
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Today', value: 'today' },
              { label: 'Yesterday', value: 'yesterday' },
              { label: 'Last 7 Days', value: '7days' },
              { label: 'This Month', value: 'month' },
              { label: 'Custom: Choose dates', value: 'custom' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center justify-center p-4 rounded-lg cursor-pointer transition transform hover:scale-105  ${
                  selectedDate === option.value 
                    ? 'bg-yellow-400 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <input 
                  type="radio" 
                  name="transactionDate" 
                  value={option.value}
                  checked={selectedDate === option.value}
                  onChange={() => setSelectedDate(option.value)}
                  className="form-radio h-5 w-5 text-yellow-500 w-1/9"
                />
                <span className="font-medium ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Transfer To / From Section */}
        <div className="mb-8">
          <label className="block font-medium mb-2 text-gray-800 text-lg">Transfer To / From</label>
          <select className="w-1/4 p-2 border border-gray-300 rounded bg-white text-lg">
            <option>Select option</option>
            {/* Add your options here */}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-1/6"
            type="button"
            onClick={() => navigate('/transferaction')}
          >
            SEARCH
          </button>
          <button
            className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none w-1/6"
            type="reset"
          >
            RESET
          </button>
        </div>

        {/* Empty state */}
        <div className="flex justify-center items-center h-32 mt-12">
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16s1.5-2 4-2 4 2 4 2M12 12a4 4 0 100-8 4 4 0 000 8zM12 14v4"></path>
            </svg>
            <p>Search all available records by selecting one of the filters above!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferHistory;

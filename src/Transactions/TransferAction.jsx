import React, { useState } from 'react';

const TransferForm = () => {
  const [transferType, setTransferType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');

  const handleAmountChange = (value) => {
    setAmount(prev => prev + value);
  };

  const handleClear = () => setAmount(0);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full h-full bg-white p-6 rounded">
        <h1 className="text-2xl font-bold mb-6 bg-gray-700 text-white p-4 rounded w-full">
          Transfer
        </h1>
        <div className="w-full max-w-lg bg-white p-6 rounded pt-7">

          {/* User Selection */}
          <div className="relative mb-4">
            <select className="block appearance-none w-full bg-white border border-black rounded p-2 text-gray-700 leading-tight focus:outline-none pr-10">
              <option>Select USER</option>
              <option>JHON</option>
              <option>DOE</option>
            </select>
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
                    transferType === option.value
                      ? 'bg-yellow-400 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700'
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
            >
              TRANSFER
            </button>
            <button
              className="border border-black hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none w-1/2"
              type="reset"
            >
              RESET
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransferForm;

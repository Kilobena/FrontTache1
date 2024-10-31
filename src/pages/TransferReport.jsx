import React from 'react';

const TransferReport = () => {
    // Données fictives pour le rapport de transfert
    const transferData = [
        {
            id: 1,
            amount: 100,
            date: '2024-10-01',
            status: 'Completed',
            sender: 'Alice',
            receiver: 'Bob',
        },
        {
            id: 2,
            amount: 250,
            date: '2024-10-05',
            status: 'Pending',
            sender: 'Charlie',
            receiver: 'Dave',
        },
        {
            id: 3,
            amount: 75,
            date: '2024-10-10',
            status: 'Failed',
            sender: 'Eve',
            receiver: 'Frank',
        },
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Transfer Report</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-4 border-b text-left">Transfer ID</th>
                        <th className="p-4 border-b text-left">Amount</th>
                        <th className="p-4 border-b text-left">Date</th>
                        <th className="p-4 border-b text-left">Status</th>
                        <th className="p-4 border-b text-left">Sender</th>
                        <th className="p-4 border-b text-left">Receiver</th>
                    </tr>
                </thead>
                <tbody>
                    {transferData.map((transfer) => (
                        <tr key={transfer.id} className="hover:bg-gray-100">
                            <td className="p-4 border-b">{transfer.id}</td>
                            <td className="p-4 border-b">${transfer.amount}</td>
                            <td className="p-4 border-b">{transfer.date}</td>
                            <td className="p-4 border-b">{transfer.status}</td>
                            <td className="p-4 border-b">{transfer.sender}</td>
                            <td className="p-4 border-b">{transfer.receiver}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransferReport;

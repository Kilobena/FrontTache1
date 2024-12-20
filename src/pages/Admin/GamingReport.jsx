import React from 'react';

const GamingReport = () => {
    // Données fictives pour le rapport de paris en ligne
    const bettingData = [
        {
            id: 1,
            betType: 'Sports Betting',
            betAmount: 50,
            winAmount: 100,
            date: '2024-10-01',
            status: 'Won',
        },
        {
            id: 2,
            betType: 'Live Casino',
            betAmount: 75,
            winAmount: 0,
            date: '2024-10-05',
            status: 'Lost',
        },
        {
            id: 3,
            betType: 'Virtual Sports',
            betAmount: 100,
            winAmount: 150,
            date: '2024-10-10',
            status: 'Won',
        },
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Gaming Report - Online Betting</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-4 border-b text-left">Bet ID</th>
                        <th className="p-4 border-b text-left">Bet Type</th>
                        <th className="p-4 border-b text-left">Bet Amount ($)</th>
                        <th className="p-4 border-b text-left">Win Amount ($)</th>
                        <th className="p-4 border-b text-left">Date</th>
                        <th className="p-4 border-b text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bettingData.map((bet) => (
                        <tr key={bet.id} className="hover:bg-gray-100">
                            <td className="p-4 border-b">{bet.id}</td>
                            <td className="p-4 border-b">{bet.betType}</td>
                            <td className="p-4 border-b">{bet.betAmount}</td>
                            <td className="p-4 border-b">{bet.winAmount}</td>
                            <td className="p-4 border-b">{bet.date}</td>
                            <td className="p-4 border-b">{bet.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GamingReport;

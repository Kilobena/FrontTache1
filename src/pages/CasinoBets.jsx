import React from 'react';

const CasinoBets = () => {
    // Données fictives pour le rapport de paris de casino
    const casinoBettingData = [
        {
            id: 1,
            game: 'Blackjack',
            betAmount: 100,
            winAmount: 150,
            date: '2024-10-01',
            status: 'Won',
        },
        {
            id: 2,
            game: 'Roulette',
            betAmount: 50,
            winAmount: 0,
            date: '2024-10-02',
            status: 'Lost',
        },
        {
            id: 3,
            game: 'Slots',
            betAmount: 20,
            winAmount: 60,
            date: '2024-10-03',
            status: 'Won',
        },
        {
            id: 4,
            game: 'Blackjack',
            betAmount: 80,
            winAmount: 0,
            date: '2024-10-05',
            status: 'Lost',
        },
        {
            id: 5,
            game: 'Roulette',
            betAmount: 30,
            winAmount: 90,
            date: '2024-10-07',
            status: 'Won',
        },
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Casino Bets Report</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-4 border-b text-left">Bet ID</th>
                        <th className="p-4 border-b text-left">Game</th>
                        <th className="p-4 border-b text-left">Bet Amount ($)</th>
                        <th className="p-4 border-b text-left">Win Amount ($)</th>
                        <th className="p-4 border-b text-left">Date</th>
                        <th className="p-4 border-b text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {casinoBettingData.map((bet) => (
                        <tr key={bet.id} className="hover:bg-gray-100">
                            <td className="p-4 border-b">{bet.id}</td>
                            <td className="p-4 border-b">{bet.game}</td>
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

export default CasinoBets;

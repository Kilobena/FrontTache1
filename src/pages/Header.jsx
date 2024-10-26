import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ user }) => {
    return (
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-6">
                <div className="text-lg"> lena bch nzido l balance TND</div>
                <div className="bg-yellow-500 text-black px-3 py-1 rounded"> role zid role </div>
                <FaUserCircle className="text-2xl" />
            </div>
        </div>
    );
};

export default Header;

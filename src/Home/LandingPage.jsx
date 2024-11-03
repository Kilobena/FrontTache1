import React, { useState } from "react";
import logo from "../assets/logo.png";
import Modal from "./Modal";
import Login from "../Auth/LoginPage";
import { useAuth } from "../providers/AuthContext";

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { login } = useAuth();

    const handleLoginClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleLoginSuccess = (userData) => {
        login(userData);
        handleCloseModal();
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 flex flex-col items-center text-gray-800">
            {/* Header */}
            <header className="w-full p-4 flex items-center justify-between bg-white/90 shadow-sm backdrop-blur-lg">
                <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" /> {/* Made logo responsive */}
                <button
                    onClick={handleLoginClick}
                    className="bg-yellow-500 text-white font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
                >
                    Login
                </button>
            </header>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center flex-grow p-6 text-center"> {/* Text centered for mobile */}
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-indigo-700 leading-tight">
                    Connect in a Whole New Way
                </h1>
                <p className="max-w-lg text-base sm:text-lg mb-8 text-gray-600">
                    Step into a community where connections are meaningful, and your journey matters.
                </p>
                <button
                    onClick={handleLoginClick}
                    className="bg-yellow-500 text-white font-medium py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
                >
                    Get Started
                </button>
            </main>

            {/* Testimonials Section */}
            <section className="w-full bg-white py-10 px-6 shadow-sm rounded-t-lg mt-12">
                <h2 className="text-center text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                    What Our Users Say
                </h2>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8">
                    <div className="bg-indigo-50 p-6 rounded-lg shadow-lg w-full sm:w-80 text-center transition-transform transform hover:scale-105 duration-300">
                        <p className="text-sm text-gray-700 italic">"An incredible platform that connects people seamlessly!"</p>
                        <span className="block mt-4 font-semibold text-indigo-600">- Alex D.</span>
                    </div>
                    <div className="bg-indigo-50 p-6 rounded-lg shadow-lg w-full sm:w-80 text-center transition-transform transform hover:scale-105 duration-300">
                        <p className="text-sm text-gray-700 italic">"Simple, efficient, and a joy to use every day."</p>
                        <span className="block mt-4 font-semibold text-indigo-600">- Maria R.</span>
                    </div>
                </div>
            </section>

            {/* Login Modal */}
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <div className="p-6 sm:p-8 bg-white rounded-lg shadow-2xl max-w-md mx-auto">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-indigo-700">
                            Sign in to your account
                        </h2>
                        <Login onLoginSuccess={handleLoginSuccess} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default LandingPage;

import React, { useState } from "react";
import logo from "../assets/logo.png";
import Modal from "./Modal";
import Login from "../Auth/LoginPage";
import sportsImage from '../assets/sports-image.webp';
import liveSportsImage from '../assets/live-sports.jpg';
import casinoImage from '../assets/casino-image.jpg';
import liveCasinoImage from '../assets/live-casino.webp';
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
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 bg-gray-800">
                <img src={logo} alt="Logo" className="h-10" />
                <nav className="space-x-6 text-sm font-medium">
                    <a href="/" className="hover:text-yellow-400">HOME</a>
                    <a href="/" className="hover:text-yellow-400">SPORTS BETTING</a>
                    <a href="/" className="hover:text-yellow-400">LIVE BETTING</a>
                    <a href="/" className="hover:text-yellow-400">CASINO</a>
                    <a href="/" className="hover:text-yellow-400">LIVE CASINO</a>
                    <a href="/" className="hover:text-yellow-400">VIRTUALS</a>
                </nav>
                <div className="space-x-4">
                    <button onClick={handleLoginClick} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                        LOGIN
                    </button>
                    <button className="bg-yellow-500 px-4 py-2 rounded text-gray-900 hover:bg-yellow-400">
                        REGISTER
                    </button>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="relative bg-cover bg-center h-96 text-center flex items-center justify-center" style={{ backgroundImage: `url(${casinoImage})` }}>
                <div className="bg-black bg-opacity-50 p-8 rounded-lg">
                    <h1 className="text-4xl font-bold text-yellow-500">Welcome to Our Betting Site</h1>
                    <p className="mt-4 text-lg">Get the best odds and live betting experience</p>
                    <button className="mt-6 bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400">
                        Join Now
                    </button>
                </div>
            </section>

            {/* Popular Games/Events */}
            <section className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Popular Games & Events</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[{ title: 'SPORTS', image: sportsImage }, { title: 'LIVE SPORTS', image: liveSportsImage }, { title: 'CASINO', image: casinoImage }, { title: 'LIVE CASINO', image: liveCasinoImage }].map((item, index) => (
                        <div key={index} className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative z-10 text-white text-2xl font-bold flex items-center justify-center h-24">{item.title}</div>
                            <button className="relative z-10 mt-2 mb-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded flex items-center justify-center mx-auto w-3/4">
                                PLAY NOW <span className="ml-2">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="p-8 bg-gray-800">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-yellow-500">Live Betting</h3>
                        <p className="mt-2">Place your bets in real-time with live odds.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-yellow-500">Secure Platform</h3>
                        <p className="mt-2">Your information and transactions are safe with us.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-yellow-500">24/7 Support</h3>
                        <p className="mt-2">Get help whenever you need it from our team.</p>
                    </div>
                </div>
            </section>

            {/* Login Modal */}
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <div className="p-6 sm:p-8 bg-gray-800 text-grey rounded-lg shadow-2xl max-w-md mx-auto">
                        <div className="flex justify-between mb-4">
                            <button className="bg-gray-700 px-4 py-2 rounded font-medium text-white">LOGIN</button>
                            <button className="bg-yellow-500 px-4 py-2 rounded text-gray-900 font-medium">REGISTER</button>
                        </div>
                        
                        <Login onLoginSuccess={handleLoginSuccess} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default LandingPage;

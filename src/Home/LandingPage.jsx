import React, { useState } from "react";
import logo from "../assets/logo.png";
import Modal from "./Modal";
import Login from "../Auth/LoginPage";
import sportsImage from '../assets/sports-image.webp';
import liveSportsImage from '../assets/live-sports.jpg';
import casinoImage from '../assets/casino-image.jpg';
import liveCasinoImage from '../assets/live-casino.webp';
import { useAuth } from "../providers/AuthContext";
import { FaBars, FaTimes } from 'react-icons/fa';

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the drawer
    const { login } = useAuth();

    const handleLoginClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const handleLoginSuccess = (userData) => {
        login(userData);
        handleCloseModal();
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-4 bg-gray-800">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10" />
                    <span className="text-xl font-bold ml-2">BETTING SITE</span>
                </div>
                
                <div className="hidden md:flex space-x-4 text-sm font-medium">
                    <a href="/" className="hover:text-yellow-400">HOME</a>
                    <a href="/" className="hover:text-yellow-400">SPORTS BETTING</a>
                    <a href="/" className="hover:text-yellow-400">LIVE BETTING</a>
                    <a href="/" className="hover:text-yellow-400">CASINO</a>
                    <a href="/" className="hover:text-yellow-400">LIVE CASINO</a>
                    <a href="/" className="hover:text-yellow-400">VIRTUALS</a>
                </div>

                {/* Login/Register for Desktop */}
                <div className="space-x-4 hidden md:flex">
                    <button onClick={handleLoginClick} className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                        LOGIN
                    </button>
                    <button className="bg-yellow-500 px-4 py-2 rounded text-gray-900 hover:bg-yellow-400">
                        REGISTER
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={toggleDrawer}>
                    <FaBars size={24} />
                </button>
            </header>

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 bg-gray-800 text-white transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="flex justify-between items-center px-4 py-4 bg-gray-800">
                    <span className="text-xl font-bold">MENU</span>
                    <button onClick={toggleDrawer}>
                        <FaTimes size={24} />
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 mt-4 px-4">
                    <a href="/" className="hover:text-yellow-400">HOME</a>
                    <a href="/" className="hover:text-yellow-400">SPORTS BETTING</a>
                    <a href="/game" className="hover:text-yellow-400">LIVE BETTING</a>
                    <a href="/" className="hover:text-yellow-400">CASINO</a>
                    <a href="/" className="hover:text-yellow-400">LIVE CASINO</a>
                    <a href="/" className="hover:text-yellow-400">VIRTUALS</a>
                    <button onClick={handleLoginClick} className="bg-gray-700 w-full py-2 rounded hover:bg-gray-600 mt-4">
                        LOGIN
                    </button>
                    <button className="bg-yellow-500 w-full py-2 rounded text-gray-900 hover:bg-yellow-400 mt-2">
                        REGISTER
                    </button>
                </nav>
            </div>

            {/* Hero Banner */}
            <section className="relative bg-cover bg-center h-96 text-center flex items-center justify-center" style={{ backgroundImage: `url(${casinoImage})` }}>
                <div className="bg-black bg-opacity-50 p-8 rounded-lg mx-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-yellow-500">Welcome to Our Betting Site</h1>
                    <p className="mt-4 text-lg">Get the best odds and live betting experience</p>
                    <button className="mt-6 bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400">
                        Join Now
                    </button>
                </div>
            </section>

            {/* Popular Games/Events */}
            <section className="p-4 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Popular Games & Events</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[{ title: 'SPORTS', image: sportsImage }, { title: 'LIVE SPORTS', image: liveSportsImage }, { title: 'CASINO', image: casinoImage }, { title: 'LIVE CASINO', image: liveCasinoImage }].map((item, index) => (
                        <div key={index} className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative z-10 text-white text-xl md:text-2xl font-bold flex items-center justify-center h-24">{item.title}</div>
                            <button className="relative z-10 mt-2 mb-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded flex items-center justify-center mx-auto w-3/4">
                                PLAY NOW <span className="ml-2">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="p-4 md:p-8 bg-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-500">Live Betting</h3>
                        <p className="mt-2 text-sm md:text-base">Place your bets in real-time with live odds.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-500">Secure Platform</h3>
                        <p className="mt-2 text-sm md:text-base">Your information and transactions are safe with us.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-500">24/7 Support</h3>
                        <p className="mt-2 text-sm md:text-base">Get help whenever you need it from our team.</p>
                    </div>
                </div>
            </section>

            {/* Login Modal */}
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <div className="p-6 sm:p-8 bg-gray-800 text-white rounded-lg shadow-2xl max-w-md mx-auto">
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

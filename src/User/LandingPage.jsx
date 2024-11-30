import React, { useState } from "react";
import logo from "../assets/logo.webp";
import Modal from "../Home/Modal";
import Login from "../Auth/LoginPage";
import Navigation from "./SidebarNavigation";
import sportsImage from "../assets/sports-image.webp";
import liveSportsImage from "../assets/live-sports.jpg";
import casinoImage from "../assets/casino-image.jpg";
import liveCasinoImage from "../assets/live-casino.webp";
import { motion } from "framer-motion";
import { useAuth } from "../providers/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from React Router


const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLoginSuccess = (userData) => {
    login(userData); // Update global user state
    setIsModalOpen(false);
  };
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    const faqs = [
      {
        question: "Who is CashBet?",
        answer:
          "CashBet is a leading platform in the online gambling industry, offering a wide variety of online casino and sports betting options since its inception. Operating globally, CashBet supports multiple languages and provides a secure, reputable environment for players worldwide. With options for both local currencies and cryptocurrency betting, CashBet is your trusted partner for online entertainment.",
      },
      {
        question: "Is CashBet licensed?",
        answer:
          "Yes, CashBet is a fully licensed and regulated platform, adhering to all necessary compliance requirements in the jurisdictions where it operates. Your safety and trust are our priority.",
      },
      {
        question: "Is betting on CashBet safe?",
        answer:
          "Absolutely! CashBet employs state-of-the-art encryption technology and strict security protocols to ensure that your personal information and transactions are always protected.",
      },
      {
        question: "What currencies can I bet with?",
        answer:
          "CashBet supports various payment methods, including cryptocurrencies like Bitcoin and Ethereum, as well as traditional fiat currencies, making it easy for users to deposit and play.",
      },
      {
        question: "What types of casino games can I play?",
        answer:
          "CashBet offers a diverse selection of games, including online slots, table games, live dealer experiences, and exclusive CashBet originals designed to deliver the ultimate gaming experience.",
      },
    ];
    

  return (
    <div className="bg-2E2E2E text-white min-h-screen">
   
      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-gray-800 text-white transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 bg-gray-800">
          <span className="text-xl font-bold">MENU</span>
          <button onClick={toggleDrawer}>
            <FaTimes size={24} />
          </button>
        </div>
     
      </div>

      {/* Main Navigation */}
      


      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{ backgroundImage: `url(${casinoImage})` }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center mx-4">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500">
            Welcome to Our Betting Site
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Get the best odds and live betting experience.
          </p>
          <button className="mt-6 bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400">
            Join Now
          </button>
        </div>
      </section>

      {/* Popular Games */}
      <section className="p-4 md:p-8 bg-2E2E2E">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
    Popular Games & Events
  </h2>
  <motion.div
    className="grid grid-cols-2 md:grid-cols-4 gap-4"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
    }}
  >
    {[
      { title: "SPORTS", image: sportsImage, link: "/sports" },
      { title: "LIVE SPORTS", image: liveSportsImage, link: "/live-sports" },
      { title: "CASINO", image: casinoImage, link: "/casino" },
      { title: "LIVE CASINO", image: liveCasinoImage, link: "/live-casino" },
    ].map((item, index) => (
      <motion.div
        key={index}
        className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        whileHover={{ scale: 1.05 }} // Slight scaling on hover
        whileTap={{ scale: 0.95 }} // Small shrink effect on click
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <Link to={item.link}>
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="h-48 w-full object-cover"
          />

          {/* Overlay Title */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.span
              className="text-white text-xl font-bold"
              whileHover={{ scale: 1.1 }}
            >
              {item.title}
            </motion.span>
          </div>
        </Link>

        {/* Button */}
        <motion.button
          className="bg-yellow-500 w-full py-2 text-gray-900 font-bold hover:bg-yellow-400"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={item.link}>PLAY NOW</Link>
        </motion.button>
      </motion.div>
    ))}
  </motion.div>
</section>


 {/* Featured Partners Section */}
 

<section className="py-12 bg-gray-800">
  <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
    Our Partners
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
    {/* Stake F1 Team Kick Sauber */}
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={sportsImage} // Sports image
        alt="Stake F1 Team"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative p-4 text-white">
        <h3 className="text-lg md:text-xl font-bold">Stake F1 Team Kick Sauber</h3>
        <p className="mt-2 text-sm md:text-base">
          Stake F1 Team Kick Sauber is a globally recognized motorsport team.
        </p>
        <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400">
          Learn More
        </button>
      </div>
    </motion.div>

    {/* UFC Official Partner */}
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={liveSportsImage} // Live Sports image
        alt="UFC Official Partner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative p-4 text-white">
        <h3 className="text-lg md:text-xl font-bold">UFC Official Partner</h3>
        <p className="mt-2 text-sm md:text-base">
          Stake is the official betting partner of UFC with exclusive promotions.
        </p>
        <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400">
          Learn More
        </button>
      </div>
    </motion.div>

    {/* Everton Football Club */}
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={casinoImage} // Casino image
        alt="Everton Football Club"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative p-4 text-white">
        <h3 className="text-lg md:text-xl font-bold">Everton Football Club</h3>
        <p className="mt-2 text-sm md:text-base">
          Stake proudly sponsors Everton FC as an official partner.
        </p>
        <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400">
          Learn More
        </button>
      </div>
    </motion.div>
  </div>
</section>


<section className="py-12 bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Still have questions?
        </h2>
        <button className="block mx-auto mb-8 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400">
          Read our guides
        </button>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Question */}
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-600"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium">{faq.question}</h3>
                <span
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* Answer */}
              {activeIndex === index && (
                <div className="p-4 border-t border-gray-600">
                  <p className="text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  


      {/* Features Section */}
      <section className="p-4 md:p-8 bg-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold text-yellow-500">Live Betting</h3>
            <p className="mt-2 text-sm md:text-base">
              Place your bets in real-time with live odds.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold text-yellow-500">Secure Platform</h3>
            <p className="mt-2 text-sm md:text-base">
              Your information and transactions are safe with us.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold text-yellow-500">24/7 Support</h3>
            <p className="mt-2 text-sm md:text-base">
              Get help whenever you need it from our team.
            </p>
          </div>
        </div>
      </section>

  

    </div>
  );
};

export default LandingPage;

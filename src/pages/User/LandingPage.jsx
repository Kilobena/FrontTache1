import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../providers/AuthContext";
import HeroBanner from "./HeroBanner";
import GameHeader from "./Games/GameHeader";
import sportsImage from "../../assets/sports-image1.webp";
import liveSportsImage from "../../assets/live-sports-image.webp";
import casinoImage from "../../assets/casino-image.webp";
import liveCasinoImage from "../../assets/live-casino-image.webp";

const LandingPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const { user, login, logout } = useAuth();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleHeader = () => {
    setIsHeaderVisible((prev) => !prev);
  };

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

  // Define image data and titles in an array of objects
  const sections = [
    { image: sportsImage, title: "sports" },
    { image: liveSportsImage, title: "live sports" },
    { image: casinoImage, title: "casino" },
    { image: liveCasinoImage, title: "live casino" },
  ];

  return (
    <div className="bg-2E2E2E text-white min-h-screen relative">
      {/* Conditionally Render Header */}
      {isHeaderVisible && (
        <div className="fixed top-0 left-0 w-full z-50">
          <GameHeader />
        </div>
      )}

      {/* Hero Section */}
      {!isHeaderVisible && <HeroBanner />}

      {/* Featured Partners Section */}
      {!isHeaderVisible && (
        <section className="py-12 bg-[#242424]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg min-h-[240px] flex flex-col"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="relative flex flex-col justify-end p-4 text-white h-full">
                  <h3 className="text-lg md:text-2xl font-bold text-center mt-auto">
                    {section.title.toUpperCase()}
                  </h3>
                  <button className="mx-auto mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400 w-32">
                    Play Now →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {!isHeaderVisible && (
        <section className="py-12 bg-[#242424] text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Still have questions?
            </h2>
            <button className="block mx-auto mb-8 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400">
              Read our guides
            </button>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[#1D1D1D] rounded-lg shadow-lg overflow-hidden"
                >
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
      )}

      {/* Features Section */}
      {/* {!isHeaderVisible && <Footer />}

      <div className="md:hidden">
        <BottomBar toggleHeader={toggleHeader} />
      </div> */}
    </div>
  );
};

export default LandingPage;

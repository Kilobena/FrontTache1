import React, { useState } from "react";
import sportsImage from "../assets/sports-image.webp";
import liveSportsImage from "../assets/live-sports.jpg";
import casinoImage from "../assets/casino-image.jpg";
import { motion } from "framer-motion";
import { useAuth } from "../providers/AuthContext";
import HeroBanner from "./HeroBanner";
import BottomBar from "../pages/BottomBar";
import Header from "./Header";

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

  return (
    <div className="bg-2E2E2E text-white min-h-screen relative">
      {/* Conditionally Render Header */}
      {isHeaderVisible && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>
      )}

      {/* Hero Section */}
      {!isHeaderVisible && <HeroBanner />}

      {/* Featured Partners Section */}
      {!isHeaderVisible && (
        <section className="py-12 bg-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Our Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
            {[sportsImage, liveSportsImage, casinoImage].map((image, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`Partner ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="relative p-4 text-white">
                  <h3 className="text-lg md:text-xl font-bold">
                    Partner {index + 1}
                  </h3>
                  <p className="mt-2 text-sm md:text-base">
                    Brief description of partner {index + 1}.
                  </p>
                  <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg text-gray-900 font-semibold hover:bg-yellow-400">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {!isHeaderVisible && (
        <section className="py-12 bg-gray-800 text-white">
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
                  className="bg-gray-700 rounded-lg shadow-lg overflow-hidden"
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
      {!isHeaderVisible && (
        <section className="p-4 md:p-8 bg-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Live Betting", "Secure Platform", "24/7 Support"].map(
              (feature, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-yellow-500">
                    {feature}
                  </h3>
                  <p className="mt-2 text-sm md:text-base">
                    Description of {feature}.
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* BottomBar */}
      <div className="md:hidden">
        <BottomBar toggleHeader={toggleHeader} />
      </div>
    </div>
  );
};

export default LandingPage;

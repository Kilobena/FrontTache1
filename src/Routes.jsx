import React, { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./providers/AuthContext.jsx";
import RegisterForm from "./Auth/Register";
import TransferHistory from "./Transactions/TransferHistory";
import TransferForm from "./Transactions/TransferAction";
import ManageUser from "./Auth/ManageUser";
import DashboardLayout from "./pages/DashboardLayout";
import RegisterPartner from "./Auth/RegistrePartner.jsx";
import TransferReport from "./pages/TransferReport.jsx";
import GamingReport from "./pages/GamingReport.jsx";
import SportBetBook from "./pages/SportBetBook.jsx";
import CasinoBets from "./pages/CasinoBets.jsx";
import LandingPage from "./User/LandingPage.jsx";
import GamePage from "./User/GamePage.jsx";
import Slots from "./User/Slots.jsx";
import Crash from "./User/Crash.jsx";
import Providers from "./User/Providers.jsx";
import LiveCasino from "./User/LiveCasino.jsx";
import Amatic from "./User/Amatic.jsx";
import Pragmatic from "./User/Pragmatic.jsx";
import Featured from "./User/Featured.jsx";
import New from "./User/New.jsx";
import AppHeader from "./User/AppHeader.jsx";
import Header from "./User/Header.jsx";
import Login from "./Auth/LoginPage.jsx";
import Modal from "./Component/UI/Modal.jsx";
import { SearchGames } from "./User/SearchGames.jsx";
import Footer from "./User/Footer.jsx";
import BottomBar from "./pages/BottomBar.jsx";

function AppRoutes() {
  const { user, login, logout } = useAuth();
  const isAuthenticated = !!user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const isUserRole = user?.role === "User";
  const location = useLocation();

  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSearchModal = () => setIsSearchModalOpen(true);
  const handleLoginSuccess = (userData) => {
    login(userData);
    setIsModalOpen(false);
  };

  const excludedHeaderRoutes = [
    "/transferaction",
    "/transferhistory",
    "/user-management",
    "/regitreP",
    "/registre",
    "/tranfer_report",
    "/gaming-report",
    "/sportsbook-bets",
    "/casino-bets",
  ];

  const isExcludedRoute = excludedHeaderRoutes.some((route) => location.pathname.startsWith(route));

  // Determine if the Header should be displayed
  const showHeader =
    location.pathname.startsWith("/game") ||
    location.pathname.startsWith("/slots") ||
    location.pathname.startsWith("/crash") ||
    location.pathname.startsWith("/providers") ||
    location.pathname.startsWith("/livecasino") ||
    location.pathname.startsWith("/amatic") ||
    location.pathname.startsWith("/pragmatic") ||
    location.pathname.startsWith("/featured") ||
    location.pathname.startsWith("/new");


  return (
    <div className="bg-[#242424] text-white min-h-screen">
      {/* Main Navigation (Always Visible) */}
      {!isExcludedRoute && <AppHeader user={user} onLoginClick={handleLoginClick} onRegisterClick={handleLoginClick} onLogout={logout} />}

      {isModalOpen && (
        <Modal className="max-w-md" title={<h2 className="font-light text-2xl mt-4">LOGIN</h2>} onClose={handleCloseModal}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Modal>
      )}

      {isSearchModalOpen && (
        <Modal
          className="w-full lg:max-w-[60rem]  lg:h-[calc(100vh-200px)] h-screen"
          title={<h2 className="mt-5 font-bold md:text-xl text-lg">Search Engine</h2>}
          onClose={() => setIsSearchModalOpen(false)}
        >
          <SearchGames />
        </Modal>
      )}

      {/* Conditionally Render Secondary Navigation (Header) */}
      {showHeader && <Header openSearchModal={handleSearchModal} />}

      {/* Routes */}
      <Routes>
        {/* Public Landing Page */}
        <Route path="/home" element={<LandingPage />} />

        {/* Game Page and Subroutes */}
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/livecasino" element={<LiveCasino />} />
        <Route path="/amatic" element={<Amatic />} />
        <Route path="/pragmatic" element={<Pragmatic />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/new" element={<New />} />
        <Route path="/menu" element={<Header />} />

        {/* Redirect Based on User Role */}
        <Route
          path="/user"
          element={
            isAuthenticated ? (
              isUserRole ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/transferaction" replace />
              )
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Protected Routes for Admin/Other Roles */}
        <Route element={<DashboardLayout user={user} />}>
          <Route path="/" element={<Navigate to={isAuthenticated ? (isUserRole ? "/home" : "/transferaction") : "/home"} replace />} />
          <Route path="/transferaction" element={isAuthenticated && !isUserRole ? <TransferForm /> : <Navigate to="/home" replace />} />
          <Route path="/transferhistory" element={isAuthenticated && !isUserRole ? <TransferHistory /> : <Navigate to="/home" replace />} />
          <Route path="/user-management" element={isAuthenticated && !isUserRole ? <ManageUser /> : <Navigate to="/home" replace />} />
          <Route path="/regitreP" element={isAuthenticated && !isUserRole ? <RegisterPartner /> : <Navigate to="/home" replace />} />
          <Route path="/registre" element={isAuthenticated && !isUserRole ? <RegisterForm /> : <Navigate to="/home" replace />} />
          <Route path="/tranfer_report" element={isAuthenticated && !isUserRole ? <TransferReport /> : <Navigate to="/home" replace />} />
          <Route path="/gaming-report" element={isAuthenticated && !isUserRole ? <GamingReport /> : <Navigate to="/home" replace />} />
          <Route path="/sportsbook-bets" element={isAuthenticated && !isUserRole ? <SportBetBook /> : <Navigate to="/home" replace />} />
          <Route path="/casino-bets" element={isAuthenticated && !isUserRole ? <CasinoBets /> : <Navigate to="/home" replace />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Footer />
      <div className="block md:hidden fixed bottom-0 w-full z-10 bg-[#242424]">
        <BottomBar openSearchModal={handleSearchModal} />
      </div>
    </div>
  );
}

export default AppRoutes;

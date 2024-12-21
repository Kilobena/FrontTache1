import React, { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./providers/AuthContext.jsx";
import RegisterForm from "./pages/Auth/Register";
import Login from "./pages/Auth/LoginPage.jsx";
import RegisterPartner from "./pages/Auth/RegistrePartner.jsx";
import ManageUser from "./pages/Auth/ManageUser";
import TransferHistory from "./pages/Transactions/TransferHistory";
import TransferForm from "./pages/Transactions/TransferAction";
import DashboardLayout from "./pages/Admin/DashboardLayout.jsx";
import TransferReport from "./pages/Admin/TransferReport.jsx";
import GamingReport from "./pages/Admin/GamingReport.jsx";
import SportBetBook from "./pages/Admin/SportBetBook.jsx";
import CasinoBets from "./pages/Admin/CasinoBets.jsx";
import LandingPage from "./pages/User/LandingPage.jsx";
import Slots from "./pages/User/Games/Slots.jsx";
import GamesHeader from "./pages/User/Games/GamesHeader.jsx";
import Crash from "./pages/User/Games/Crash.jsx";
import GamePage from "./pages/User/Games/Lobby.jsx";
import LiveCasino from "./pages/User/Games/LiveCasino.jsx";
import Providers from "./pages/User/Games/Providers.jsx";
import Amatic from "./pages/User/Games/Amatic.jsx";
import Pragmatic from "./pages/User/Games/Pragmatic.jsx";
import Featured from "./pages/User/Games/Featured.jsx";
import New from "./pages/User/Games/New.jsx";
import { SearchGames } from "./pages/User/Games/SearchGames.jsx";
import Footer from "./components/layout/Footer.jsx";
import BottomBar from "./components/layout/BottomBar.jsx";
import AppHeader from "./components/layout/header/AppHeader.jsx";
import Modal from "./components/ui/Modal.jsx";
import OtherGames from "./pages/User/Games/OtherGames.jsx";

function AppRoutes() {
  const { user, login, logout } = useAuth();
  const isAuthenticated = !!user;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const isUserRole = user?.role === "User";
  const location = useLocation();

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleCloseModal = () => setIsLoginModalOpen(false);
  const handleSearchModal = () => setIsSearchModalOpen(true);

  const handleLoginSuccess = (userData) => {
    login(userData);
    setIsLoginModalOpen(false);
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
    location.pathname.startsWith("/casino") ||
    location.pathname.startsWith("/slots") ||
    location.pathname.startsWith("/crash") ||
    location.pathname.startsWith("/providers") ||
    location.pathname.startsWith("/livecasino") ||
    location.pathname.startsWith("/amatic") ||
    location.pathname.startsWith("/pragmatic") ||
    location.pathname.startsWith("/featured") ||
    location.pathname.startsWith("/other-games") ||
    location.pathname.startsWith("/new");

  return (
    <div className="bg-[#242424] text-white min-h-screen">
      {/* Main Navigation (Always Visible) */}
      {!isExcludedRoute && <AppHeader user={user} onLoginClick={handleLoginClick} onRegisterClick={handleLoginClick} onLogout={logout} />}

      {isLoginModalOpen && (
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
      {showHeader && <GamesHeader openSearchModal={handleSearchModal} />}

      {/* Routes */}
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />

        {/* Game Page and Subroutes */}
        <Route path="/login" element={<Login />} />
        <Route path="/casino" element={<GamePage />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/livecasino" element={<LiveCasino />} />
        <Route path="/amatic" element={<Amatic />} />
        <Route path="/pragmatic" element={<Pragmatic />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/new" element={<New />} />
        <Route path="/other-games" element={<OtherGames />} />
        <Route path="/menu" element={<GamesHeader />} />

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
        <Route element={<DashboardLayout user={user} logout={logout} />}>
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

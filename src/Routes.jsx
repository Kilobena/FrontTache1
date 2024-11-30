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
import Navigation from "./User/SidebarNavigation.jsx";
import Header from "./User/Header.jsx";
import Login from "./Auth/LoginPage.jsx";
import Modal from "./Home/Modal.jsx";

function AppRoutes() {
  const { user, login, logout } = useAuth();
  const isAuthenticated = !!user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isUserRole = user?.role === "User";
  const location = useLocation();

  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleLoginSuccess = (userData) => {
    login(userData);
    setIsModalOpen(false);
  };

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
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Main Navigation (Always Visible) */}
      <Navigation
        user={user}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleLoginClick}
        onLogout={logout}
      />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
  <div className="p-18 sm:p-18 bg-gray-800 text-white rounded-lg shadow-2xl max-w-2xl w-full mx-auto">
  <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </Modal>
      )}

      {/* Conditionally Render Secondary Navigation (Header) */}
      {showHeader && <Header />}

      {/* Routes */}
      <Routes>
        {/* Public Landing Page */}
        <Route path="/home" element={<LandingPage />} />

        {/* Game Page and Subroutes */}
        <Route path="/game" element={<GamePage />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/livecasino" element={<LiveCasino />} />
        <Route path="/amatic" element={<Amatic />} />
        <Route path="/pragmatic" element={<Pragmatic />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/new" element={<New />} />

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
        <Route element={<DashboardLayout />}>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  isAuthenticated
                    ? isUserRole
                      ? "/home"
                      : "/transferaction"
                    : "/home"
                }
                replace
              />
            }
          />
          <Route
            path="/transferaction"
            element={
              isAuthenticated && !isUserRole ? (
                <TransferForm />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/transferhistory"
            element={
              isAuthenticated && !isUserRole ? (
                <TransferHistory />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/user-management"
            element={
              isAuthenticated && !isUserRole ? (
                <ManageUser />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/regitreP"
            element={
              isAuthenticated && !isUserRole ? (
                <RegisterPartner />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/registre"
            element={
              isAuthenticated && !isUserRole ? (
                <RegisterForm />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/tranfer_report"
            element={
              isAuthenticated && !isUserRole ? (
                <TransferReport />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/gaming-report"
            element={
              isAuthenticated && !isUserRole ? (
                <GamingReport />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/sportsbook-bets"
            element={
              isAuthenticated && !isUserRole ? (
                <SportBetBook />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/casino-bets"
            element={
              isAuthenticated && !isUserRole ? (
                <CasinoBets />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;

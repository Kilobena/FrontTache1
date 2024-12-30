import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./providers/AuthContext";
import RegisterForm from "./pages/Auth/Register";
import Login from "./pages/Auth/LoginPage";
import RegisterPartner from "./pages/Auth/RegistrePartner";
import ManageUser from "./pages/Auth/ManageUser";
import TransferHistory from "./pages/Admin/TransferHistory";
import TransferForm from "./pages/Admin/TransferAction";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import TransferReport from "./pages/Admin/TransferReport";
import GamingReport from "./pages/Admin/GamingReport";
import SportBetBook from "./pages/Admin/SportBetBook";
import CasinoBets from "./pages/Admin/CasinoBets";
import LandingPage from "./pages/User/LandingPage";
import Betting from "./pages/User/Betting";
import GamesCategoryHeader from "./pages/User/Games/GamesCategoryHeader";
import { SearchGames } from "./pages/User/Games/SearchGames";
import AppHeader from "./components/layout/header/AppHeader";
import Footer from "./components/layout/Footer";
import BottomBar from "./components/layout/BottomBar";
import Modal from "./components/ui/Modal";
import GameHistory from "./pages/User/Games/GameHistory";
import { GAMES_CATEGORY_NAV, ADMIN_NAV } from "./routes/APP_ROUTES";

function AppRoutes() {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [isTablet, setIsTablet] = useState(window?.innerWidth <= 1024);
  const [isMobile, setIsMobile] = useState(window?.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { user, login, logout } = useAuth();
  const isAuthenticated = !!user;
  const isUserRole = user?.role === "User";

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleCloseModal = () => setIsLoginModalOpen(false);
  const handleSearchModal = () => setIsSearchModalOpen(true);

  const handleLoginSuccess = (userData) => {
    login(userData);
    setIsLoginModalOpen(false);
  };

  // const excludedHeaderRoutes = [
  //   "/agent/transfer",
  //   "/agent/transfer-history",
  //   "/agent/user-management",
  //   "agent/register-partner",
  //   "/agent/register-user",
  //   "/agent/transfers-report",
  //   "/agent/gaming-report",
  //   "/sportsbook-bets",
  //   "/agent/casino-bets",
  // ];

  // Determine if the Header should be displayed
  const isExcludedRoute = ADMIN_NAV.some(({ path }) => location.pathname === "/agent" + "" + path);
  const excludeGameCategoryHeader = GAMES_CATEGORY_NAV.some(({ path }) => location.pathname === path);

  return (
    <div className="bg-[#242424] text-white min-h-screen">
      {/* Main Navigation (Always Visible) */}
      {!isExcludedRoute && (
        <AppHeader
          user={user}
          excludeGameCategoryHeader={excludeGameCategoryHeader}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleLoginClick}
          onLogout={logout}
        />
      )}

      {isLoginModalOpen && (
        <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal} className="max-w-md" title={<h2 className="font-light text-2xl mt-4">LOGIN</h2>}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Modal>
      )}

      {isSearchModalOpen && (
        <Modal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          className="w-full lg:max-w-[60rem]  lg:h-[calc(100vh-80px)] h-screen"
          title={<h2 className="mt-[20px] font-bold md:text-xl text-lg">Search Engine</h2>}
        >
          <SearchGames />
        </Modal>
      )}

      {/* Conditionally Games Categories Navigation (Header) */}
      {(!isMobile && excludeGameCategoryHeader) || (isMobile && location.pathname.startsWith("/casino")) ? (
        <GamesCategoryHeader openSearchModal={handleSearchModal} />
      ) : null}

      {/* Routes */}
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />

        {/* Game Page and Subroutes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sports-betting" element={<Betting />} />
        <Route path="/live-betting" element={<Betting />} />
        {GAMES_CATEGORY_NAV.map((item) => (
          <Route key={item.label} path={item.path} element={item.component} />
        ))}

        {/* Redirect Based on User Role */}
        <Route
          path="/user"
          element={
            isAuthenticated ? (
              isUserRole ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/agent/transfer" replace />
              )
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Protected Routes for Admin/Other Roles */}
        <Route path="/" element={<Navigate to={isAuthenticated ? (isUserRole ? "/home" : "/agent/transfer") : "/home"} replace />} />
        <Route path="/game-history" element={<GameHistory />} />
        <Route element={<DashboardLayout excludeGameCategoryHeader={excludeGameCategoryHeader} user={user} logout={logout} />}>
          {ADMIN_NAV.map((item) => (
            <Route
              key={item.label}
              path={"/agent" + "" + item.path}
              element={isAuthenticated && !isUserRole ? item.component : <Navigate to="/home" replace />}
            />
          ))}

          {/* <Route path="/agent/transfer" element={isAuthenticated && !isUserRole ? <TransferForm /> : <Navigate to="/home" replace />} />
          <Route path="/agent/transfer-history" element={isAuthenticated && !isUserRole ? <TransferHistory /> : <Navigate to="/home" replace />} />
          <Route path="/agent/user-management" element={isAuthenticated && !isUserRole ? <ManageUser /> : <Navigate to="/home" replace />} />
          <Route path="agent/register-partner" element={isAuthenticated && !isUserRole ? <RegisterPartner /> : <Navigate to="/home" replace />} />
          <Route path="/agent/register-user" element={isAuthenticated && !isUserRole ? <RegisterForm /> : <Navigate to="/home" replace />} />
          <Route path="/agent/transfers-report" element={isAuthenticated && !isUserRole ? <TransferReport /> : <Navigate to="/home" replace />} />
          <Route path="/agent/gaming-report" element={isAuthenticated && !isUserRole ? <GamingReport /> : <Navigate to="/home" replace />} />
          <Route path="/sportsbook-bets" element={isAuthenticated && !isUserRole ? <SportBetBook /> : <Navigate to="/home" replace />} />
          <Route path="/agent/casino-bets" element={isAuthenticated && !isUserRole ? <CasinoBets /> : <Navigate to="/home" replace />} /> */}
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

import React, { useState, useEffect } from "react";
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
import Betting from "./pages/User/Betting";
import LandingPage from "./pages/User/LandingPage.jsx";
import GamesCategoryHeader from "./pages/User/Games/GamesCategoryHeader.jsx";
import { SearchGames } from "./pages/User/Games/SearchGames.jsx";
import Footer from "./components/layout/Footer.jsx";
import BottomBar from "./components/layout/BottomBar.jsx";
import AppHeader from "./components/layout/header/AppHeader.jsx";
import Modal from "./components/ui/Modal.jsx";
import { GAMES_CATEGORY_NAV } from "./routes/routes_data.jsx";

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
  const excludeAppHeader =
    // GAMES_CATEGORY_NAV.map(
    //   ({ path }) => location.pathname.startsWith(path === "casino") && location.pathname.startsWith(path)
    // );
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

  const excludeGameCategoryHeader =
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
      {!isExcludedRoute && (
        <AppHeader
          user={user}
          excludeAppHeader={excludeAppHeader}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleLoginClick}
          onLogout={logout}
        />
      )}

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
                <Navigate to="/transferaction" replace />
              )
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Protected Routes for Admin/Other Roles */}
        <Route element={<DashboardLayout excludeAppHeader={excludeAppHeader} user={user} logout={logout} />}>
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

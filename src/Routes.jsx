import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './providers/AuthContext.jsx';

import RegisterForm from './Auth/Register';
import TransferHistory from './Transactions/TransferHistory';
import TransferForm from './Transactions/TransferAction';
import ManageUser from './Auth/ManageUser';
import DashboardLayout from './pages/DashboardLayout';
import UserPage from './pages/UserPage';
import RegisterPartner from './Auth/RegistrePartner.jsx';
import TransferReport from './pages/TransferReport.jsx';
import GamingReport from './pages/GamingReport.jsx';
import SportBetBook from './pages/SportBetBook.jsx';
import CasinoBets from './pages/CasinoBets.jsx';
import LandingPage from './Home/LandingPage.jsx';
import HomePage from './Home/HomePage.jsx';
import GamePage from './Games/GamePage.jsx';

function AppRoutes() {
    const { user } = useAuth();
    const isAuthenticated = !!user;
    const isUserRole = user?.role === "User";  // Check if the user has the "User" role

    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/home" element={<LandingPage />} />
                <Route path="/game" element={<GamePage />} />

                <Route path="/homePage" element={<HomePage />} />

                
                {/* User Route */}
                <Route path="/user" element={isAuthenticated && isUserRole ? <UserPage /> : <Navigate to="/home" replace />} />

                {/* Protected Routes */}
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Navigate to={isAuthenticated ? "/transferaction" : "/home"} replace />} />
                    
                    {/* TransferAction: Redirect to "/user" if user role is 'User', otherwise render TransferForm */}
                    <Route 
                        path="/transferaction" 
                        element={isAuthenticated ? (isUserRole ? <Navigate to="/user" replace /> : <TransferForm />) : <Navigate to="/home" replace />} 
                    />
                    
                    {/* Other Protected Routes */}
                    <Route path="/transferhistory" element={isAuthenticated ? <TransferHistory /> : <Navigate to="/home" replace />} />
                    <Route path="/user-management" element={isAuthenticated ? <ManageUser /> : <Navigate to="/home" replace />} />
                    <Route path="/regitreP" element={isAuthenticated ? <RegisterPartner /> : <Navigate to="/home" replace />} />
                    <Route path="/registre" element={isAuthenticated ? <RegisterForm /> : <Navigate to="/home" replace />} />
                    <Route path="/tranfer_report" element={isAuthenticated ? <TransferReport /> : <Navigate to="/home" replace />} />
                    <Route path="/gaming-report" element={isAuthenticated ? <GamingReport /> : <Navigate to="/home" replace />} />
                    <Route path="/sportsbook-bets" element={isAuthenticated ? <SportBetBook /> : <Navigate to="/home" replace />} />
                    <Route path="/casino-bets" element={isAuthenticated ? <CasinoBets /> : <Navigate to="/home" replace />} />

                </Route>

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;

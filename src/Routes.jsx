import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './providers/AuthContext.jsx';

import HomePage from './Home/HomePage';
import RegisterForm from './Auth/Register';
import TransferHistory from './Transactions/TransferHistory';
import TransferForm from './Transactions/TransferAction';
import ManageUser from './Auth/ManageUser';
import DashboardLayout from './pages/DashboardLayout';
import UserPage from './pages/UserPage';

function AppRoutes() {
    const { user } = useAuth();
    const isAuthenticated = !!user;
    const isUserRole = user?.role === "User";

    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Navigate to="/transferaction" replace />} />
                    <Route 
                        path="/transferaction" 
                        element={isAuthenticated ? (isUserRole ? <Navigate to="/user-redirect" replace /> : <TransferForm />) : <Navigate to="/home" replace />} 
                    />
                    <Route path="/transferhistory" element={isAuthenticated ? <TransferHistory /> : <Navigate to="/home" replace />} />
                    <Route path="/user-management" element={isAuthenticated ? <ManageUser /> : <Navigate to="/home" replace />} />
                    <Route path="/registre" element={isAuthenticated ? <RegisterForm /> : <Navigate to="/home" replace />} />
                </Route>
                <Route path="/user-redirect" element={<UserPage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;

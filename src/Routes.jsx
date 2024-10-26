import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './Home/HomePage';
import RoleBasedPage from './pages/RoleBasedPage';
import RegisterForm from './Auth/Register';
import TransferHistory from './Transactions/TransferHistory';
import TransferForm from './Transactions/TransferAction';
import ManageUser from './Auth/ManageUser';
import DashboardLayout from './pages/DashboardLayout';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* HomePage route without sidebar */}
        <Route path="/home" element={<HomePage />} />

        {/* Dashboard layout with the sidebar */}
        <Route element={<DashboardLayout />}>
          {/* Default dashboard route redirects to /transferaction */}
          <Route path="/" element={<Navigate to="/transferaction" replace />} />
          <Route path="/transferaction" element={<TransferForm />} />
          <Route path="/transferhistory" element={<TransferHistory />} />
          <Route path="/user-management" element={<ManageUser />} />
          <Route path="/registre" element={<RegisterForm />} />
        </Route>

        {/* Catch-all for undefined routes, redirect to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

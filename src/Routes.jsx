import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Auth/Register';

import TransferHistory from './Transactions/TransferHistory';
import TransferForm from './Transactions/TransferAction';

import ManageUser from './Auth/ManageUser';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/transferhistory" element={<TransferHistory />} />
        <Route path="/transferaction" element={<TransferForm />} />
        <Route path="/user" element={<ManageUser />} />


      </Routes>
    </Router>
  );
}

export default AppRoutes;

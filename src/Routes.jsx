import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Auth/Register';
import ManageUser from './Auth/ManageUser';
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/user" element={<ManageUser />} />

      </Routes>
    </Router>
  );
}

export default AppRoutes;

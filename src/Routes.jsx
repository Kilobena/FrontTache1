import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './Auth/Register';
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

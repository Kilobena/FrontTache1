import AppRoutes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./providers/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/css/global.css";
import "./assets/styles/css/tailwind.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AuthProvider>
  );
}

export default App;

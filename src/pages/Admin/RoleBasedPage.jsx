import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { useAuth } from "../../providers/AuthContext"; // Import AuthContext

const RoleBasedPage = ({ children }) => {
  const { user } = useAuth(); // Get user data from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to the landing page if no user is logged in
      navigate("/home");
    } else if (user.role !== "User") {
      // Redirect all non-user roles to AdminDashboard
      navigate("/admin-dashboard");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while user is being fetched
  }

  // Render the landing page (children) for the "User" role
  if (user.role === "User") {
    return <>{children}</>;
  }

  // Render the AdminDashboard for all other roles
  return <AdminDashboard user={user} />;
};

export default RoleBasedPage;

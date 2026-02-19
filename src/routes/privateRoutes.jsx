// PrivateRoute.tsx
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  // Replace this logic with your real auth check (e.g., from Redux, Context, or localStorage)
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login and preserve attempted path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

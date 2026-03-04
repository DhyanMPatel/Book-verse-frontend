// AdminRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RouteConstants from "../utils/routeConstants";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login and preserve attempted path
    return <Navigate to={RouteConstants.login} state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    // Redirect non-admin users to home with unauthorized state
    return <Navigate to={RouteConstants.home} state={{ unauthorized: true }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;

// PrivateRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RouteConstants from "../utils/routeConstants";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login and preserve attempted path
    return <Navigate to={RouteConstants.login} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

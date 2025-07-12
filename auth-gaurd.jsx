import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state) => state.storeData.userData?.isAuthenticated
  );

  const currentPath = location.pathname;

  // Only guard dashboard routes
  const isProtectedRoute = currentPath.startsWith("/dashboard");

  // Allow everything except protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;

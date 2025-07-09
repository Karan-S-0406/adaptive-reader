import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state) => state.storeData.userData?.isAuthenticated
  );

  const publicRoutes = ["/", "/student-login", "/parent-teacher-login"];

  if (isAuthenticated === null) return null;

  const currentPath = location.pathname;

  const isPublicRoute =
    publicRoutes.includes(currentPath) ||
    publicRoutes.some((path) => path !== "/" && currentPath.startsWith(path));

  if (!isAuthenticated && isPublicRoute) {
    return children;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;

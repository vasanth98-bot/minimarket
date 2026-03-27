import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ Fix: make role comparison case-insensitive
  if (requiredRole && role?.toUpperCase() !== requiredRole.toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;

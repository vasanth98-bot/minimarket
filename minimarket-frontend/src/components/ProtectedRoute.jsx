import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to the actual login page
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

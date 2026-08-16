import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/ui/Spinner";

export function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, isChecking } = useAuth();

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
}

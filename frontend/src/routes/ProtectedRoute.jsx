import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/ui/Spinner";

/**
 * Guards a route behind authentication. While the session is being verified
 * we show a spinner instead of flashing the login page or the protected
 * content. Usage: <Route element={<ProtectedRoute />}><Route .../></Route>
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

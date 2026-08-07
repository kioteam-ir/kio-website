import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { authApi } from "../api/authApi";
import { tokenStorage } from "../client/httpClient";

const initialState = { status: "checking", user: null };

function authReducer(state, action) {
  switch (action.type) {
    case "AUTHENTICATED":
      return { status: "authenticated", user: action.user ?? null };
    case "GUEST":
      return { status: "guest", user: null };
    default:
      return state;
  }
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const verifySession = useCallback(async () => {
    const access = tokenStorage.getAccess();
    const refresh = tokenStorage.getRefresh();

    if (!access && !refresh) {
      dispatch({ type: "GUEST" });
      return;
    }

    if (access) {
      try {
        const user = await authApi.verifyToken(access);
        dispatch({ type: "AUTHENTICATED", user });
        return;
      } catch {
        // access token invalid/expired — fall through to refresh
      }
    }

    if (refresh) {
      try {
        await authApi.verifyToken(refresh);
        const tokens = await authApi.refreshToken(refresh);
        tokenStorage.set(tokens.access_token, tokens.refresh_token);
        const user = await authApi.verifyToken(tokens.access_token);
        dispatch({ type: "AUTHENTICATED", user });
        return;
      } catch {
        tokenStorage.clear();
        dispatch({ type: "GUEST" });
        return;
      }
    }

    dispatch({ type: "GUEST" });
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    tokenStorage.set(data.access_token, data.refresh_token);
    const user = await authApi.verifyToken(data.access_token);
    dispatch({ type: "AUTHENTICATED", user });
    return data;
  }, []);

  const signup = useCallback(async (payload) => {
    return authApi.signup(payload);
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    dispatch({ type: "GUEST" });
  }, []);

  const value = useMemo(
    () => ({
      status: state.status,
      user: state.user,
      isAuthenticated: state.status === "authenticated",
      isAdmin:
        state.status === "authenticated" && Boolean(state.user?.is_admin),
      isChecking: state.status === "checking",
      login,
      signup,
      logout,
      refresh: verifySession,
    }),
    [state, login, signup, logout, verifySession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

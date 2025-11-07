import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, logout as apiLogout, register as apiRegister } from "@/services/auth";
import type { User } from "@/services/auth"

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Restore user from token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await apiLogin(email, password);
    const newToken = localStorage.getItem("token");
    setUser(loggedInUser);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const register = async (email: string, password: string) => {
    const newUser = await apiRegister(email, password);
    const newToken = localStorage.getItem("token");
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}

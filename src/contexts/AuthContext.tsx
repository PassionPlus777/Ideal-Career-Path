import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get the ID token
        const token = await user.getIdToken();
        // Store the token in localStorage
        localStorage.setItem("auth_token", token);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        // Clear token and user data on sign out
        localStorage.removeItem("auth_token");
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Check for existing token on mount
    const token = localStorage.getItem("auth_token");
    if (token && !user) {
      // If we have a token but no user, wait for Firebase to initialize
      auth.authStateReady().then(() => {
        if (!auth.currentUser) {
          // If still no user after Firebase is ready, token is invalid
          localStorage.removeItem("auth_token");
          setIsAuthenticated(false);
          setLoading(false);
        }
      });
    }

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("auth_token", token);
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      localStorage.removeItem("auth_token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Cookies from "js-cookie";

import { AuthSession } from "@/types/Schema";

interface GlobalContextType {
  user: AuthSession | null;
  isLoading: boolean;
  setUserData: (userData: AuthSession) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const infoSession = Cookies.get("userData");
    if (infoSession) {
      setUser(JSON.parse(infoSession));
    }
    setIsLoading(false);
  }, []);

  const setUserData = (userData: AuthSession) => {
    setUser(userData);
    Cookies.set("userData", JSON.stringify(userData), { expires: 2 });
  };

  return (
    <GlobalContext.Provider value={{ user, isLoading, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}

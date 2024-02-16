import React, { useState } from "react";

interface BarOptsContextType {
  optSelect: string;
  setOptSelect: (opt: string) => void;
}

const BarOptsContext = React.createContext<BarOptsContextType | undefined>(undefined);

export function BarOptsProvider({ children }: { children: React.ReactNode }) {
  const [optSelect, setOptSelect] = useState("current");

  const contextValue: BarOptsContextType = {
    optSelect,
    setOptSelect,
  };

  return (
    <BarOptsContext.Provider value={contextValue}>
      {children}
    </BarOptsContext.Provider>
  );
}

export function useBarOptsContext() {
  const context = React.useContext(BarOptsContext);
  if (!context) {
    throw new Error("useBarOptsContext must be used within a BarOptsProvider");
  }
  return context;
}
import React, { useState } from "react";

interface BarOptsContextType {
  optSelect: string;
  setOptSelect: (opt: string) => void;
  eventState: boolean;
  setEventState: (state: boolean) => void;
}

const BarOptsContext = React.createContext<BarOptsContextType | undefined>(
  undefined
);

export function BarOptsProvider({ children }: { children: React.ReactNode }) {
  const [optSelect, setOptSelect] = useState("current");
  const [eventState, setEventState] = useState(false);

  const contextValue: BarOptsContextType = {
    optSelect,
    setOptSelect,
    eventState,
    setEventState,
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

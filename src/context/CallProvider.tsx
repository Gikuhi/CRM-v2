
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { DialerLead } from '@/lib/types';

export type CallStatus = "idle" | "dialing" | "active" | "wrap-up" | "ended";

interface CallContextType {
  callStatus: CallStatus;
  setCallStatus: React.Dispatch<React.SetStateAction<CallStatus>>;
  currentLead: DialerLead | null;
  startCall: (lead: DialerLead) => void;
  clearCall: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [currentLead, setCurrentLead] = useState<DialerLead | null>(null);

  const startCall = (lead: DialerLead) => {
    if (callStatus === 'idle') {
      setCurrentLead(lead);
      setCallStatus("dialing");
    }
  };

  const clearCall = () => {
    setCurrentLead(null);
    setCallStatus("idle");
  }

  return (
    <CallContext.Provider value={{ callStatus, setCallStatus, currentLead, startCall, clearCall }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

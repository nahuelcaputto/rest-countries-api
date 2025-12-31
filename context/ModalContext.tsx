"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  message: string;
  showModal: (message: string) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showModal = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setMessage("");
  };

  return (
    <ModalContext.Provider value={{ isOpen, message, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

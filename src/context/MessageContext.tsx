import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  text: string;
  severity: "success" | "error" | "info";
}

interface MessageContextType {
  message: Message | null;
  showMessage: (text: string, severity: "success" | "error" | "info") => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<Message | null>(null);

  const showMessage = useCallback((text: string, severity: "success" | "error" | "info") => {
    setMessage({ text, severity });
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }, []);


  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

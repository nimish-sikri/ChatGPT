"use client"

import { createContext, useContext, useState } from 'react';

interface MessageContextType {
  message: string | null;
  setMessage: (message: string | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  reply: string | null;
  setReply: (message: string | null) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

interface MessageProviderProps {
  children: React.ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reply, setReply] = useState<string | null>("");

  return (
    <MessageContext.Provider value={{ message, setMessage, loading, setLoading, reply, setReply }}>
      {children}
    </MessageContext.Provider>
  );
};
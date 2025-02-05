import React, { useContext, useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

export interface ISocketProps {
  socket: Socket;
  getEventName: (key: SocketEventKeys) => string;
}

export const SocketContext = React.createContext<ISocketProps | undefined>(
  undefined
);

export enum SocketEventKeys {
  EMAIL_CONVERSATIONS = 'email_channel',
  CHAT_COVERSATION_LIST = 'conversation_list',
  CHAT_MESSAGE_LIST = 'message_list',
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = io('https://test.socket.getgro.io/', {
      autoConnect: false,
    });
  }

  useEffect(() => {
    const socket = socketRef.current;
    socket?.connect();

    return () => {
      socket?.removeAllListeners();
      socket?.disconnect();
    };
  }, []);

  const getEventName = (key: SocketEventKeys) => {
    return `${import.meta.env.VITE_SOCKET_ENV}_${key}`;
  };

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, getEventName }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): ISocketProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

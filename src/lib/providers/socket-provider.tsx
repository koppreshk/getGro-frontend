import { useAuth } from 'modules/login';
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
  EMAIL_CONVERSATIONS = 'new_ticket_message',
  CHAT_COVERSATION_LIST = 'new_conversation',
  CHAT_MESSAGE_LIST = 'new_conversation_message',
  EMAIL_LIST = 'new_ticket',
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Socket | null>(null);
  const userAuth = useAuth();

  if (!socketRef.current) {
    socketRef.current = io(
      `https://${import.meta.env.VITE_SOCKET_ENV}.socket.getgro.io/`,
      {
        autoConnect: false,
      }
    );
  }

  useEffect(() => {
    // if (import.meta.env.VITE_SOCKET_ENV !== 'test') {
    const socket = socketRef.current;
    socket?.connect();
    socket?.emit('register', {
      client_id: userAuth.user?.clientId,
      user_id: userAuth.user?.userId,
    });

    return () => {
      socket?.removeAllListeners();
      socket?.disconnect();
    };
    // }
  }, [userAuth.user?.clientId, userAuth.user?.userId]);

  const getEventName = (key: SocketEventKeys) => {
    return `${key}`;
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

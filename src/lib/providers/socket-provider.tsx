import React, { useContext, useEffect, useMemo } from 'react';
import { Socket, io } from 'socket.io-client';

export interface ISocketProps {
  socket: Socket;
}

export const SocketContext = React.createContext<ISocketProps>(
  {} as ISocketProps
);

export const SocketProvider = React.memo(
  (props: { children: React.ReactNode }) => {
    const socket = useMemo(
      () => io('https://test.socket.getgro.io/', { autoConnect: false }),
      []
    );

    useEffect(() => {
      socket.connect(); // Manually connect when the provider mounts

      return () => {
        socket.disconnect(); // Clean up when unmounting
      };
    }, [socket]);

    return (
      <SocketContext.Provider value={{ socket: socket }}>
        {props.children}
      </SocketContext.Provider>
    );
  }
);

SocketProvider.displayName = 'SocketProvider';

export const useSocket = () => useContext(SocketContext);

import React, { useContext } from 'react';
import { Socket, io } from 'socket.io-client';

export interface ISocketProps {
  socket: Socket;
}

export const SocketContext = React.createContext<ISocketProps>(
  {} as ISocketProps
);

export const SocketProvider = React.memo(
  (props: { children: React.ReactNode }) => {
    const socket = io('https://test.socket.getgro.io/');

    return (
      <SocketContext.Provider value={{ socket: socket }}>
        {props.children}
      </SocketContext.Provider>
    );
  }
);

export const useSocket = () => useContext(SocketContext);

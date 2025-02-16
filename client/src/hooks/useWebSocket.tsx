import { Socket, io } from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';
// import { safeParseJsonType } from 'utils';
import { useUserStore } from 'store';
import * as mapEnv from 'constants/map-env';

type TWebsocketContextProps = {
  exportEvent: any | null;
  sendMessage?: any;
};

type TProps = {
  children?: React.ReactNode;
};

const WebsocketContext = createContext<TWebsocketContextProps>({
  exportEvent: null,
});

export const WebsocketProvider = ({ children }: TProps) => {
  const [state, setState] = useState<any | null>(null);
  const userInfo = useUserStore((state) => state.userInfo);

  let socket: Socket;

  const sendMessage = (receiverId: any, receiver: string, message: string) => {
    socket.emit('message:send', { receiver: { id: receiverId, username: receiver }, message });
  };

  useEffect(() => {
    if (userInfo?.id && mapEnv.BASE_URL) {
      socket = io(mapEnv.BASE_URL, {
        transports: ['websocket'],
      });

      socket.on('connect', () => socket.emit('user:login', userInfo.username));

      socket.on('user:login', (msg, err) => {
        console.log('login'), msg, err;
      });

      socket.on('message:receive', (data, err) => {
        console.log('receive', data, err);
      });

      socket.on('error', (error) => {
        console.log('error', error);
      });

      socket.on('disconnect', (data, err) => {
        console.log('disconnect', data, err);
      });
    }

    if (!userInfo?.id && socket !== undefined) {
      socket.disconnect();
    }

    return () => {
      socket && socket.disconnect();
    };
  }, [userInfo?.id]);

  return (
    <WebsocketContext.Provider
      value={{
        exportEvent: state,
        sendMessage,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => {
  return useContext(WebsocketContext);
};

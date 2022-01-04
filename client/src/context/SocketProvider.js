import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();
  const url = window.location.href;

  useEffect(() => {
    const newSocket = io(`${url}`, {
      query: { id },
      cors: {
        origin: [
          process.env.DOMAIN_FULL + ":" + process.env.PORT,
          "http://localhost:3001",
        ],
      },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

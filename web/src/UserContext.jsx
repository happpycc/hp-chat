import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    axios.get("/auth").then((resp) => {
      if (resp.status === 200) {
        setId(resp.data.id);
        setUsername(resp.data.username);
        setSocket(io(import.meta.env.VITE_SOCKETIO_URL));
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ username, setUsername, id, setId, socket, setSocket }}
    >
      {children}
    </UserContext.Provider>
  );
}

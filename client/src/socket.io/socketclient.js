import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
// console.log(SOCKET_URL);

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

// console.log(socket);

export const connectSocket = (userId) => {
  if (!userId) return;
  socket.auth = { userId };
  socket.connect();
  socket.emit("joinRoom", userId);

  socket.on("getOnlineUsers", (users) => {
    console.log("🟢 Online users:", users);
    dispatch(setOnlineUsers(users));
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

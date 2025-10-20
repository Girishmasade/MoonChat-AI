import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(cors());
app.set("io", io);

// Store online users: userId -> socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // ✅ FIX: get userId from auth instead of query
  const userId = socket.handshake.auth?.userId;

  if (userId) {
    onlineUsers.set(userId, socket.id);
    // console.log("🟢 Online Users Map:", Array.from(onlineUsers.keys()));
  }

  io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));

  socket.on("disconnect", () => {
    // console.log(`🔴 User disconnected: ${socket.id}`);
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }

    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
     io.emit("userStatusChange");
  });
});

export { app, server, io, onlineUsers };

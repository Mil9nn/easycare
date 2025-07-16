import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : true,
    credentials: true,
  }
});

io.on("connection", (socket) => {
  console.log('✅ Socket connected:', socket.id);

  socket.on("disconnect", () => {
    console.log('Socket disconnected:', socket.id);
  })
});

export { io, app, server };
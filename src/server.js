import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

server.listen(3000, () => console.log("Server Start: listening..."));

io.on("connection", (socket) => {
  // Show on connection with client
  console.log("Connected to Client!!!");

  socket.on("JOIN_ROOM", (message) => {
    socket.join(message.rid);
    io.to(message.rid).emit("CONNECTED", "Successfully Connected To Server !!");
  });

  socket.on("OFFER_FROM_CLIENT", (message) => {
    console.log("OFFER_FROM_CLIENT");
    console.log(message.offer.type);
    socket.to(message.rid).emit("OFFER_FROM_SERVER", message);
  });

  socket.on("ANSWER_FROM_CLIENT", (message) => {
    console.log("ANSWER_FROM_CLIENT");
    console.log(message.answer.type);
    socket.to(message.rid).emit("ANSWER_FROM_SERVER", message);
  });

  socket.on("ICE_FROM_CLIENT", (message) => {
    console.log("ICE_FROM_CLIENT");
    console.log(message);
    socket.to(message.rid).emit("ICE_FROM_SERVER", message);
  });

  // Check if connection is gone
  socket.on("disconnect", () => console.log("Disconnected from client!!!"));
});

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update with frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "*" }));

const usersInRoom = {}; // Track users in rooms

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join_room", ({ name, room }) => {
    if (!room) return;

    socket.join(room);
    console.log(`${name} joined room: ${room}`);

    // Prevent duplicate messages
    if (!usersInRoom[socket.id]) {
      usersInRoom[socket.id] = { name, room };

      // Send "has joined" message to EVERYONE in the room, including the sender
      io.to(room).emit("message", {
        name: "System",
        text: `${name} has joined the chat.`,
      });
    }
  });

  socket.on("message", ({ name, room, text }) => {
    if (!room) return;
    io.to(room).emit("message", { name, text });
  });

  socket.on("disconnect", () => {
    const user = usersInRoom[socket.id];
    if (user) {
      io.to(user.room).emit("message", {
        name: "System",
        text: `${user.name} has left the chat.`,
      });
      delete usersInRoom[socket.id];
    }
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});

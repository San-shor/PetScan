const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const router = require("./routers/router");
const cors = require("cors");
const { newMessage } = require("./controllers/chatController");
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;
const URI = process.env.DB_URL + "/petScan";
const http = require("http");

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // socket.on("chat message", (data) => {
  //   console.log(data);
  //   socket.emit("recieved message", data);
  // });
  socket.on("join_room", (room_id) => {
    console.log("Room ID:", room_id);
    socket.join(room_id);
  });

  socket.on("send_message", async (data) => {
    await newMessage(data);

    io.in(data.chatId).emit("receive_message", data);
  });
});

(async () => {
  try {
    await mongoose.connect(URI).then(() => {
      console.log(`🦆 Database connected @ port ${DB_PORT}!`);
    });
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();

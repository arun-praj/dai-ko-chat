const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");

const connect = require("./config/connect");

dotenv.config({
   path: "./config/config.env",
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);

connect();

f (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}



io.on("connection", (socket) => {
   console.log("a user connected");
   socket.on("join", (user, callback) => {
      socket.broadcast.emit("message", { text: `God ${user.name} has joined the chat.` });
      // console.log(user.name);
   });
   socket.on("sendMessage", ({ name, message }, callback) => {
      io.emit("message", { text: message, name: name });
      callback();
      console.log(message);
   });
   socket.on("disconnect", () => {
      console.log("user left the chat");
   });
});


app.use("/", (req, res, next) => {
   res.status(200).json({
      status: "running",
   });
});
const PORT = process.env.PORT || 4000;

server.listen(PORT, (e) => {
   if (e) {
      return console.log("Error");
   }
   console.log(`Server Started : ${PORT}`);
});

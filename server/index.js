require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;

app.use(express.json());

app.use(cors());

// import package
const http = require("http");
const { Server } = require("socket.io");

//add after app initialization
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // define client origin if both client and server have different origin
  },
});
require("./src/socket")(io);

//change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`));

const router = require("./src/routes/routes");

app.use("/api/v1/", router);

app.use("/uploads", express.static("uploads"));

//app.listen(port, () => console.log(`Server running on port: ${port}`));

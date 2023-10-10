// Import modules
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { Server } from "socket.io";
import { createServer, get } from "http";
import { createRedisClient, createRoom, getRoom} from "./utils/redis.js";
import { ClientEvents, ServerEvents } from "./utils/constants.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const redis = await createRedisClient();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//   app.use("/api", routes);

io.on("connection", async (socket) => {
    console.log("User connected");
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User joined room: " + data);
    });

    socket.on(ClientEvents.JOIN_ROOM, (data) => {
        socket.join("123");
        createRoom(redis, "123", { "name": "test" })
        console.log("User joined room: " + data);
    });

    socket.on(ClientEvents.MESSAGE, async (data) => {
        const r = await getRoom(redis, "123");
        console.log(r)
    });
});

server.listen(3001, () => {
    console.log("Server listening on on http://localhost:3001");
});

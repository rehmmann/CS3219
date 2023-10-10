// Import modules
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { Server } from "socket.io";
import { createServer, get } from "http";
import { createRedisClient, getRoom} from "./utils/redis.js";
import { ClientErrors, ClientEvents, ServerEvents } from "./utils/constants.js";
import { validateToken } from "./utils/firebase.js";
import { clientJoinRoom } from "./controllers/clientJoinRoom.js";
import { clientLeaveRoom } from "./controllers/clientLeaveRoom.js";
import admin from 'firebase-admin';
import serviceAccount from "./serviceAccount.json" assert { type: "json" };
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const redis = await createRedisClient();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//   app.use("/api", routes);

const authentication = async (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token;
        try {
            if (await validateToken(firebaseApp, token)) {
                if (!socket.handshake.query.uid) {
                    return next(new Error(ClientErrors.MISSING_USER_ID));
                }
                next();
            } else {
                return next(new Error(ClientErrors.INVALID_TOKEN));
            }
        } catch (err) {
            return next(new Error(ClientErrors.INVALID_TOKEN));
        }
    } else {
        return next(new Error(ClientErrors.MISSING_TOKEN));
    }
};

const connection = async (socket) => {
    const userId = socket.handshake.query.uid;
    clientJoinRoom(io, socket, redis, userId);
    clientLeaveRoom(io, socket, redis, userId);
    socket.on('disconnect', () => { 
        console.log("User " + userId + " disconnected")
    })
};

io.use(authentication).on("connection", connection);

server.listen(80, () => {
    console.log("Server listening on on http://localhost:80");
});

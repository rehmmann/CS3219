import { createHash } from "crypto";
import { ServerEvents } from "./constants.js";

export const sendErrorToClient = (io, socket, error) => {

    io.to(socket.id).emit(ServerEvents.ERROR, {
        error: error
    });
}

export const makeRoomId = (userId, otherUserId) => {
    const arr = [userId, otherUserId].sort();
    return createHash('sha256').update(arr[0] + arr[1]).digest('hex');
}
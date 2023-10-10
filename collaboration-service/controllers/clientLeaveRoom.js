import { ClientEvents } from "../utils/constants.js";

export const clientLeaveRoom = async (io, socket, redis, client) => {
    const handleLeaveRoom = async (data) => {
        console.log("Client left room: " + data);
    }
    socket.on(ClientEvents.LEAVE_ROOM, handleLeaveRoom);
}
import { ClientEvents, ServerEvents } from "../utils/constants.js";
import { makeRoomId, sendErrorToClient } from "../utils/utils.js";
import { 
    createRoom,
    getRoom,
} from "../utils/redis.js";

export const clientJoinRoom = async (io, socket, redis, userId) => {
    const handleJoinRoom = async (data) => {
        const jsonData = JSON.parse(data)
        console.log("Client joined room: " + data);
        const otherUserId = jsonData.otherUserId;
        const questionId = jsonData.questionId;
        if (!otherUserId || !questionId) {
            sendErrorToClient(io, socket, "Missing fields");
            return;
        }
        const roomId = makeRoomId(userId, otherUserId, questionId);
        const room = await getRoom(redis, roomId) 
        if (room) {
            console.log("Room already exists")
            socket.emit(ServerEvents.JOINED_ROOM, room)
        } else {
            console.log("Creating room")
            await createRoom(redis, roomId, {
                users: [userId, otherUserId],
                roomId: roomId,
                questionId: questionId
            });
            const room = await getRoom(redis, roomId) 
            socket.emit(ServerEvents.JOINED_ROOM, room)
        }
    }
    socket.on(ClientEvents.JOIN_ROOM, handleJoinRoom);
}
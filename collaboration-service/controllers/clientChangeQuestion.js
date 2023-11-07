import { ClientEvents, ServerEvents } from "../utils/constants.js";
import { changeQuestionStatus } from "../utils/redis.js";

export const clientChangeQuestion = async (io, socket, redis, userId) => {
   const handleChangeQuestion = async (data) => {
       const otherUserId = data.otherUserId;
       if (!otherUserId) {
           sendErrorToClient(io, socket, "Missing fields");

           console.error("Missing fields in change question request: " + data)
           return;
       }
       const roomId = data.roomId;
       io.emit(ServerEvents.CHANGE_REQUEST, { 
           userId,
           roomId
       });
       await changeQuestionStatus(redis, roomId, userId, true);
       console.log("change status 1 to true")
   }
   socket.on(ClientEvents.CHANGE_QUESTION, handleChangeQuestion);
}
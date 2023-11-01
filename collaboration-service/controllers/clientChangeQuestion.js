// import { ClientEvents, ServerEvents } from "../utils/constants.js";
 import { changeQuestionStatus, getRoom } from "../utils/redis.js";
 

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
        // User 1 cancels the change request
        socket.on(ClientEvents.CANCEL_CHANGE_QN, async () => {
            // Reset the flags in Redis for the pending change request
            await changeQuestionStatus(redis, roomId, userId, false);
            await changeQuestionStatus(redis, roomId, otherUserId, false);
            // Emit a cancelChange event to all users
            io.emit(ServerEvents.CANCEL_CHANGE_REQUEST, { 
                userId,
                roomId
            });
            console.log("cancel status 1")
        });


        // User 2 confirms the change
        socket.on(ClientEvents.CONFIRM_CHANGE_QN, async () => {
            // Set a flag in Redis to indicate the request is confirmed for User 2
            await changeQuestionStatus(redis, roomId, otherUserId, true);
            console.log("change status 2 to true")

            const changeQuestionIdUser1 = userId + "ChangeConfirmation"
            const changeQuestionIdUser2 = otherUserId + "ChangeConfirmation"
            const room = await getRoom(redis, roomId);
            // Check if both users have confirmed the change in Redis
            const user1Confirmation = room[changeQuestionIdUser1]
            const user2Confirmation = room[changeQuestionIdUser2]
            console.log("user 1 status: " + user1Confirmation)
            console.log("user 2 status: " + user2Confirmation)
            if (user1Confirmation && user2Confirmation) {
                        // Get the new question ID
                        const newQuestionId = 'newQuestionId'; // Get the new question ID logic here
                        // Emit the new question ID to both users
                        io.emit(ServerEvents.QUESTION_CHANGED, { newQuestionId });
                        // Reset the flags in Redis for the next change request
                        await changeQuestionStatus(redis, roomId, userId, true);
                        await changeQuestionStatus(redis, roomId, otherUserId, true);

            }
        });
    }
    socket.on(ClientEvents.CHANGE_QUESTION, handleChangeQuestion);
}

const ClientEvents = {
    CHANGE_QUESTION: "change-question",
    CANCEL_CHANGE_QN: "cancel-change-qn",
    CONFIRM_CHANGE_QN: "confirm-change-qn"
}
const ServerEvents = {
    CHANGE_REQUEST: "change-qn-request",
    CANCEL_CHANGE_REQUEST: "cancel-change-qn-request",
    QUESTION_CHANGED: "question-changed"
}
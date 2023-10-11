export const ClientEvents = {
    JOIN_ROOM: 'join-room',
    LEAVE_ROOM: 'leave-room',
    DELETE_ROOM: 'delete-room',
    REFRESH_ROOM: 'refresh-room',
    MESSAGE: 'message',
    CODE: 'code',
}

export const ServerEvents = {
    JOINED_ROOM: 'joined-room',
    LEFT_ROOM: 'left-room',
    DELETE_ROOM: 'deleted-room',
    ROOM_STATE: 'room-state',
    MESSAGE: 'message',
    CODE: 'code',
    ERROR: 'error',
}

export const ClientErrors = {
    MISSING_TOKEN: 'Missing JWT',
    INVALID_TOKEN: "Invalid JWT",
    MISSING_USER_ID: "Missing User ID",
}
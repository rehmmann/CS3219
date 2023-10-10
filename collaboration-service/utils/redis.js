import { createClient } from 'redis';

const stringify = data => JSON.stringify(data);
const roomKey = (key) => + "r(" + key + ")";

const DEFAULT_ROOM_DETAILS = {
    messages: [],
    code: ""
}

export const createRedisClient = async () => {
    const redisClient = createClient({ 
        url: process.env.IS_LOCAL ? '' : 'redis://redis'
     });
    await redisClient.connect();
    return redisClient;
}

export const createRoom = async (redisClient, roomId, roomDetails) => {
    return redisClient.set(roomKey(roomId), stringify({
        ...DEFAULT_ROOM_DETAILS,
        ...roomDetails,
    }));
}

export const getRoom = async (redisClient, roomId) => {
    return redisClient.get(roomKey(roomId));
}
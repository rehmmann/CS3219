import { createClient } from 'redis';

const stringify = data => JSON.stringify(data);
const roomKey = (key) => "r: " + key;

export const createRedisClient = async () => {
    const redisClient = createClient({ 
        url: 'redis://redis'
     });
    await redisClient.connect();
    return redisClient;
}

export const createRoom = async (redisClient, roomId, roomDetails) => {
    console.log("ASD", roomKey(roomId), roomDetails)
    return redisClient.set(roomKey(roomId), stringify(roomDetails));
}

export const getRoom = async (redisClient, roomId) => {
    return redisClient.get(roomKey(roomId));
}
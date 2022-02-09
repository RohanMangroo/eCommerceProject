// import { createClient } from 'redis';
import redis from 'redis';

// const redisClient = createClient();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

// redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

export default redisClient;

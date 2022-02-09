// import { createClient } from 'redis';
// import redis from 'redis';

// const redisClient = createClient();

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL,
//   socket: {
//     tls: true,
//     rejectUnauthorized: false,
//   },
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));

// await redisClient.connect();

// export default redisClient;

// import redis from 'redis';
// import fs from 'fs';

// const client = redis.createClient({
//   url: process.env.REDIS_URL,
//   socket: {
//     tls: true,
//     rejectUnauthorized: false,
//   },
// });

import redis from 'redis';

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

// await client.ping();

// await client.quit();

export default client;

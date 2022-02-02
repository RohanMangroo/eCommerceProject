import jwt from 'jsonwebtoken';
import client from '../redis/redis.js';

export default async function cartInfo(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  // client.HSET(`${decodedToken.username}:${decodedToken.id}`, 'newItem3', '1');

  const cart = await client.HGETALL(
    `${decodedToken.username}:${decodedToken.id}`
  );
  res.send(cart);
}
// const cart = await client.HGETALL('rohan94');
// console.log(cart);

import jwt from 'jsonwebtoken';
import client from '../redis/redis.js';

export default function cartInfo(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');
  console.log(decodedToken);
  client.HSET(`${decodedToken.username}${decodedToken.id}`, 'cart', 'empty');
  res.send('token recieved...');
}

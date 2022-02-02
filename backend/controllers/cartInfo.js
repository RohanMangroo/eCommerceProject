import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';

export default async function cartInfo(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');
  const key = `${decodedToken.username}:${decodedToken.id}`;

  const cart = redisUtils.getCart(key);
  res.send(cart);
}

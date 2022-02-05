import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';

export default async function getFavs(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  const key = `${decodedToken.username}:${decodedToken.id}:fav`;

  const favorites = await redisUtils.getFavorites(key);
  res.json(favorites);
}

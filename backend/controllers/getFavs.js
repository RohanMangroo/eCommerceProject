import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';
import db from '../db/index.js';

export default async function getFavs(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  const key = `${decodedToken.username}:${decodedToken.id}:fav`;

  try {
    const favorites = await redisUtils.getFavorites(key);
    return res.json(favorites);
  } catch (e) {
    console.log(
      'Something went wrong when trying to get favorites from Redis',
      e
    );

    res.json(
      'Something ent wrong when trying to get favorites from Redis, so we will try to get it from the database'
    );
  }
}

import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';
import { deleteFavorite } from '../db/queries.js';
import db from '../db/index.js';

export default async function deleteFav(req, res) {
  console.log(req.body);
  console.log(req.headers.authorization);
  const { title, movieId } = req.body;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  //Key for Redis
  const key = `${decodedToken.username}:${decodedToken.id}:fav`;

  await redisUtils.deleteItem(key, title);
  const favorites = await redisUtils.getFavorites(key);

  res.json(favorites);

  db.query(deleteFavorite(decodedToken.id, movieId));
  res.json('deleting...');
}

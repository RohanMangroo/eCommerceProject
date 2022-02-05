import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';
import { addFavorite } from '../db/queries.js';
import db from '../db/index.js';

export default async function updateFav(req, res) {
  const { title, movieId } = req.body;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  const key = `${decodedToken.username}:${decodedToken.id}:fav`;

  redisUtils.setItem(key, title, true);
  res.json('fav recieved');
  db.query(addFavorite(decodedToken.id, movieId));
}

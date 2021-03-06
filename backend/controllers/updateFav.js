import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';
import { addFavorite } from '../db/queries.js';
import db from '../db/index.js';
import cartUtils from '../utils/cartUtils.js';

export default async function updateFav(req, res) {
  const { title, movieId, media_type } = req.body;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');
  const processedTitle = cartUtils.fixString(title);
  const key = `${decodedToken.username}:${decodedToken.id}:fav`;

  await redisUtils.setItem(key, title, `${movieId}/${media_type}`);

  const favorites = await redisUtils.getFavorites(key);
  res.json(favorites);
  db.query(addFavorite(decodedToken.id, processedTitle, media_type, movieId));
}

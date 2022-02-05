import jwt from 'jsonwebtoken';

import redisUtils from '../utils/redisUtils.js';

import { deleteFavorite } from '../db/queries.js';
import db from '../db/index.js';

export default async function deleteFav(req, res) {
  const { title, movieId } = req.body;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  //Key for Redis
  const key = `${decodedToken.username}:${decodedToken.id}:fav`;

  //Delete Favorite
  await redisUtils.deleteItem(key, title);

  //Get all favorites to return
  const favorites = await redisUtils.getFavorites(key);

  res.json(favorites);

  db.query(deleteFavorite(decodedToken.id, movieId));
  // res.json('deleting...');
}

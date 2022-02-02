import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';

export default async function addItem(req, res) {
  const movie = req.body.movieData;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  //Key used for Redis cart. Key Shape: 'username:userID'. Example: 'rohan:94'
  const key = `${decodedToken.username}:${decodedToken.id}`;

  //Each movie is a key WITHIN the cart key. Key shape: 'movieTitle/moviePrice'. Example: 'The Godfather/19.99'
  //Each movie(item) is associated with a quantity. Example: 'The Godfather/19.99 : 2'
  const item = `${movie.title}/${movie.price}`;

  const itemExists = redisUtils.checkItemExsistance(key, item);

  if (itemExists) redisUtils.incrementBy(key, item, 1);
  else redisUtils.setItem(key, item, 1);

  const cart = redisUtils.getCart(key);

  res.send(cart);
}

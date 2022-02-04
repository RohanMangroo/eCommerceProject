import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';

export default async function changeQuantity(req, res) {
  const title = req.body.title;
  const action = req.body.action;

  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  //Key used for Redis cart. Key Shape: 'username:userID'. Example: 'rohan:94'
  const key = `${decodedToken.username}:${decodedToken.id}`;
  const quantity = action === 'plus' ? 1 : -1;

  await redisUtils.incrementBy(key, title, quantity);

  const currentQuantity = await redisUtils.getItem(key, title);
  if (currentQuantity <= 0) redisUtils.deleteItem(key, title);

  res.json('Item Quantity Changed');
}

import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';

export default async function deleteItem(req, res) {
  const title = req.body.title;
  console.log(title);
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  //Key used for Redis cart. Key Shape: 'username:userID'. Example: 'rohan:94'
  const key = `${decodedToken.username}:${decodedToken.id}`;

  await redisUtils.deleteItem(key, title);
  res.json('Item Deleted');
}

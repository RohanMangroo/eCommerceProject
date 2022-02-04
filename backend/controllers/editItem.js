import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';

export default function editItem(req, res) {
  const item = req.body.item;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  //Key used for Redis cart. Key Shape: 'username:userID'. Example: 'rohan:94'
  const key = `${decodedToken.username}:${decodedToken.id}`;
}

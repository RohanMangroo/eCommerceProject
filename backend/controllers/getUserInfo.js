import jwt from 'jsonwebtoken';
import db from '../db/index.js';
import { getOrderHistory, getUserData } from '../db/queries.js';

export default async function getUserInfo(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  const userId = decodedToken.id;
  const orderHistory = await db.query(getOrderHistory(userId));
  const userInfo = await db.query(getUserData(userId));
  res.json({ orderHistory: orderHistory.rows, userData: userInfo.rows });
}

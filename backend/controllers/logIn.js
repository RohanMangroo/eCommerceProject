import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserInfo } from '../db/queries.js';
import client from '../redis/redis.js';

async function logIn(req, res) {
  const { username, password } = req.body;

  const data = await db.query(findUserInfo(username));
  const dataLength = data.rowCount;

  if (dataLength === 0) return res.send('No User Found...');

  const userData = data.rows[0];
  const passwordMatch = await bcrypt.compare(password, userData.password);

  await sendResponse(res, passwordMatch, username, userData.id);
}

//===============================================================//

async function sendResponse(res, passwordMatch, username, id) {
  if (passwordMatch) {
    const cart = await client.HGETALL(`${username}:${id}`);

    const token = jwt.sign({ username: username, id: id }, 'mySuperSecret');

    res.json({ userId: id, token, isLoggedIn: true, username, cart });
  } else res.send('Credentials Are Incorrect');
}

export default logIn;

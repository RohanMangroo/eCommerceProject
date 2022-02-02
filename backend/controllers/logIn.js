import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserInfo } from '../db/queries.js';
import client from '../redis/redis.js';

async function logIn(req, res) {
  const { username, password, localCart } = req.body;

  const data = await db.query(findUserInfo(username));
  const dataLength = data.rowCount;

  if (dataLength === 0) return res.send('No User Found...');

  const userData = data.rows[0];
  const passwordMatch = await bcrypt.compare(password, userData.password);

  await sendResponse(res, passwordMatch, username, userData.id, localCart);
}

//===============================================================//

async function sendResponse(res, passwordMatch, username, id, localCart) {
  if (passwordMatch) {
    for (let i = 0; i < localCart.length; i++) {
      const itemExists = await client.HEXISTS(
        `${username}:${id}`,
        `${localCart[i].title}`
      );

      if (itemExists) {
        await client.HINCRBY(
          `${username}:${id}`,
          `${localCart[i].title}`,
          localCart[i].quantity
        );
      } else {
        client.HSET(
          `${username}:${id}`,
          `${localCart[i].title}`,
          localCart[i].quantity
        );
      }
    }

    const cart = await client.HGETALL(`${username}:${id}`);
    console.log(cart);
    const token = jwt.sign({ username: username, id: id }, 'mySuperSecret');

    res.json({ userId: id, token, isLoggedIn: true, username, cart });
  } else res.send('Credentials Are Incorrect');
}

export default logIn;

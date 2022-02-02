import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';
import { findUserInfo } from '../db/queries.js';

async function logIn(req, res) {
  const { username, password, localCart } = req.body;

  const data = await db.query(findUserInfo(username));
  const dataLength = data.rowCount;

  if (!dataLength) return res.send('No User Found...');

  const userData = data.rows[0];
  const passwordMatch = await bcrypt.compare(password, userData.password);

  await sendResponse(res, passwordMatch, username, userData.id, localCart);
}

//===============================================================//

async function sendResponse(res, passwordMatch, username, id, localCart) {
  //If the password matches combine the cart from local storage with the cart from redis
  if (passwordMatch) {
    for (let i = 0; i < localCart.length; i++) {
      const key = `${username}:${id}`;
      const item = `${localCart[i].title}`;
      const quantity = localCart[i].quantity;

      const itemExists = redisUtils.checkItemExsistance(key, item);

      if (itemExists) redisUtils.incrementBy(key, item, quantity);
      else redisUtils.setItem(key, item, quantity);
    }

    //Send the wntire cart back to client
    const cart = redisUtils.getCart(key);
    const token = jwt.sign({ username: username, id: id }, 'mySuperSecret');

    res.json({ userId: id, token, isLoggedIn: true, username, cart });
  } else res.send('Credentials Are Incorrect');
}

export default logIn;

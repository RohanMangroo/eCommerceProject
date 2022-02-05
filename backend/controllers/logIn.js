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

      const itemExists = await redisUtils.checkItemExsistance(key, item);

      if (itemExists) await redisUtils.incrementBy(key, item, quantity);
      else await redisUtils.setItem(key, item, quantity);
    }

    const key = `${username}:${id}`;
    const favKey = `${username}:${id}:fav`;

    //Send the entire cart back to client
    const cart = await redisUtils.getCart(key);

    //The function .getCart needs to be renamed...
    const favorites = await redisUtils.getCart(favKey);
    const token = jwt.sign({ username: username, id: id }, 'mySuperSecret');

    res.json({
      userId: id,
      token,
      isLoggedIn: true,
      username,
      cart,
      favorites,
    });
  } else res.send('Credentials Are Incorrect');
}

export default logIn;

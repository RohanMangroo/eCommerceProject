import jwt from 'jsonwebtoken';
import redisUtils from '../utils/redisUtils.js';
import cartUtils from '../utils/cartUtils.js';

async function checkout(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');
  const key = `${decodedToken.username}:${decodedToken.id}`;

  const cart = redisUtils.getCart(key);

  cartUtils.processCartOrders(cart);

  redisUtils.deleteCart(key);
  res.json('Orders Submitted');
}

export default checkout;

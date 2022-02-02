import client from '../redis/redis.js';
import jwt from 'jsonwebtoken';
import db from '../db/index.js';

async function checkout(req, res) {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  const username = decodedToken.username;
  const id = decodedToken.id;

  const cart = await client.HGETALL(
    `${decodedToken.username}:${decodedToken.id}`
  );

  for (let item in cart) {
    // console.log(typeof item);
    const splitArray = item.split('/');
    const title = fixString(splitArray[0]);
    console.log(title);
    const price = splitArray[1];
    const quantity = cart[item];
    await db.query(
      `INSERT INTO Orders(title, quantity, price, userId) VALUES('${title}', '${quantity}', ${price}, ${decodedToken.id});`
    );
  }
  client.DEL(`${decodedToken.username}:${decodedToken.id}`);
  res.json('Orders Submitted');
}

export default checkout;

function fixString(string) {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    result += string[i];
    if (string[i] === "'") result += string[i];
  }

  return result;
}

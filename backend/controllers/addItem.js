import jwt from 'jsonwebtoken';
import client from '../redis/redis.js';

export default async function addItem(req, res) {
  const item = req.body.movieData;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'mySuperSecret');

  const itemExists = await client.HEXISTS(
    `${decodedToken.username}:${decodedToken.id}`,
    `${item.title}/${item.price}`
  );

  if (itemExists) {
    await client.HINCRBY(
      `${decodedToken.username}:${decodedToken.id}`,
      `${item.title}/${item.price}`,
      1
    );
  } else {
    client.HSET(
      `${decodedToken.username}:${decodedToken.id}`,
      `${item.title}/${item.price}`,
      1
    );
  }

  const cart = await client.HGETALL(
    `${decodedToken.username}:${decodedToken.id}`
  );
  console.log(cart);
  //   console.log(cart);
  res.send(cart);
}

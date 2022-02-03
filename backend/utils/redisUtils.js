import client from '../redis/redis.js';

async function checkItemExsistance(key, item) {
  const itemExists = client.HEXISTS(key, item);
  return itemExists;
}

async function incrementBy(key, item, increment) {
  client.HINCRBY(key, item, increment);
}

async function setItem(key, item, quantity) {
  client.HSET(key, item, quantity);
}

async function getCart(key) {
  const cart = client.HGETALL(key);
  return cart;
}

async function deleteCart(key) {
  client.DEL(key);
}

export default {
  checkItemExsistance,
  incrementBy,
  setItem,
  getCart,
  deleteCart,
};

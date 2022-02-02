import db from '../db/index.js';

async function processCartOrders(cart) {
  for (let item in cart) {
    const splitItem = item.split('/');
    const title = fixString(splitItem[0]);
    const price = splitItem[1];
    const quantity = cart[item];

    await db.query(
      `INSERT INTO Orders(title, quantity, price, userId) VALUES('${title}', '${quantity}', ${price}, ${decodedToken.id});`
    );
  }
}

//This function is needed to add an extra apostrophe to a string so it can be properly entered into postgres table
function fixString(string) {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    result += string[i];
    if (string[i] === "'") result += string[i];
  }
  return result;
}

export default {
  processCartOrders,
  fixString,
};

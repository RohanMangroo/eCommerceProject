export function createUser({ username, email, hashedPassword }) {
  return `INSERT INTO Users(username, email, password) VALUES('${username}', '${email}', '${hashedPassword}') RETURNING id;`;
}

export function findUserInfo(username) {
  const query = `SELECT Users.id, Users.username, Users.password FROM Users WHERE Users.username = '${username}';`;
  return query;
}

export function getOrderHistory(id) {
  const query = `SELECT Orders.* FROM Orders WHERE userId = ${id}`;
  return query;
}

export function getUserData(id) {
  const query = `SELECT Users.* FROM Users WHERE id = ${id}`;
  return query;
}

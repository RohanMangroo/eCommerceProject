export function createUser({ username, email, hashedPassword }) {
  return `INSERT INTO Users(username, email, password) VALUES('${username}', '${email}', '${hashedPassword}') RETURNING id;`;
}

export function findUserInfo(username) {
  const query = `SELECT Users.username, Users.password FROM Users WHERE Users.username = '${username}';`;
  return query;
}

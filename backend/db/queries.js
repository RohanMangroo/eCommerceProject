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

export function addFavorite(userId, title, media_type, movieId) {
  const query = `INSERT INTO Favorites(userId, title, media_type, movieId) VALUES(${userId}, '${title}', '${media_type}', ${movieId})`;
  return query;
}

export function deleteFavorite(userId, movieId) {
  const query = `DELETE FROM Favorites WHERE userId = ${userId} AND movieId = ${movieId}`;
  return query;
}

export function getFavorites(id) {
  const query = `SELECT Favorites.* FROM Favorites WHERE userId = ${id}`;
  return query;
}

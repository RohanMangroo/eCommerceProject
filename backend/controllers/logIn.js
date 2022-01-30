import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserInfo } from '../db/queries.js';

export default async function logIn(req, res) {
  const { username, password } = req.body;

  const { rows } = await db.query(findUserInfo(username));

  if (!rows.length) res.send('No User Found');
  else {
    const comparePassword = await bcrypt.compare(password, rows[0].password);

    if (comparePassword) {
      const token = jwt.sign(
        { username: username, id: rows[0].id },
        'mySuperSecret'
      );
      console.log(rows);
      res.json({ userId: rows[0].id, token, isLoggedIn: true });
    } else res.send('Credentials Are Incorrect');
  }
}

import { createUser } from '../db/queries.js';
import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function signUp(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const data = await db.query(
      createUser({ username, email, hashedPassword })
    );

    const id = data.rows[0].id;
    const token = jwt.sign({ username: username, id: id }, 'mySuperSecret');

    res.json({ userId: id, token, isLoggedIn: true });
  } catch (err) {
    res.send('Username Taken');
  }
}

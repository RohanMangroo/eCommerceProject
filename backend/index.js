import express from 'express';
import db from './db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserInfo } from './db/queries.js';

const app = express();
const PORT = 5000;

//URL encoded parsing middleware
app.use(express.urlencoded({ extended: false }));

//body parsing middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.post('/signUp', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const { rows } = await db.query(
      createUser({ username, email, hashedPassword })
    );

    const token = jwt.sign(
      { username: username, id: rows[0].id },
      'mySuperSecret'
    );

    res.json({ userId: rows[0].id, token, isLoggedIn: true });
  } catch (err) {
    res.send('Sorry, that username is taken!');
  }
});

app.post('/logIn', async (req, res) => {
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
      res.json({ userId: rows[0].id, token, isLoggedIn: true });
    } else res.send('Credentials Are Incorrect');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

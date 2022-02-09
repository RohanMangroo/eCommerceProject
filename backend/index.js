import express from 'express';
import path from 'path';
import setHeaders from './middleware/setHeaders.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import infoRouter from './routes/info.js';
import favRouter from './routes/fav.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

//URL encoded parsing middleware
app.use(express.urlencoded({ extended: false }));

//body parsing middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(setHeaders);

// app.use('/', (req, res) => {
//   console.log('route hit...');
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app.use('/auth', authRouter);

app.use('/user', cartRouter, infoRouter, favRouter);

app.get('*', (req, res) => {
  console.log('route hit, line 36');
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// console.log(path.join(__dirname, '../frontend/build/index.html'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

///Users/rohan/e-commerce/frontend/build/index.html
//frontend/build
///frontend/build/index.html

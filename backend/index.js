import express from 'express';
import setHeaders from './middleware/setHeaders.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import infoRouter from './routes/info.js';
import favRouter from './routes/fav.js';

const app = express();
const PORT = 5000;

//URL encoded parsing middleware
app.use(express.urlencoded({ extended: false }));

//body parsing middleware
app.use(express.json());

app.use(setHeaders);

app.use('/auth', authRouter);

app.use('/user', cartRouter, infoRouter, favRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

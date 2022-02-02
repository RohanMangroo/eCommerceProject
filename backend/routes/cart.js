import express from 'express';
const cartRouter = express();
import cartInfo from '../controllers/cartInfo.js';
import addItem from '../controllers/addItem.js';
import checkout from '../controllers/checkout.js';

cartRouter.get('/cart', cartInfo);

cartRouter.post('/cart/item', addItem);

cartRouter.post('/cart/checkout', checkout);

export default cartRouter;

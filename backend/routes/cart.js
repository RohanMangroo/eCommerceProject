import express from 'express';
const cartRouter = express();
import cartInfo from '../controllers/cartInfo.js';
import addItem from '../controllers/addItem.js';
import checkout from '../controllers/checkout.js';
import guestCheckout from '../controllers/guestCheckout.js';

cartRouter.get('/cart', cartInfo);

cartRouter.post('/cart/item', addItem);

cartRouter.post('/cart/checkout', checkout);

cartRouter.post('/cart/guestCheckout', guestCheckout);

export default cartRouter;

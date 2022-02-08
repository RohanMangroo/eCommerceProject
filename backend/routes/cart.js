import express from 'express';
const cartRouter = express();
import cartInfo from '../controllers/cartInfo.js';
import addItem from '../controllers/addItem.js';
import checkout from '../controllers/checkout.js';
import guestCheckout from '../controllers/guestCheckout.js';
import editItem from '../controllers/editItem.js';
import deleteItem from '../controllers/deleteItem.js';
import changeQuantity from '../controllers/changeQuantity.js';

cartRouter.get('/cart', cartInfo);

cartRouter.post('/cart/item', addItem);

cartRouter.post('/cart/item/quantity', changeQuantity);

cartRouter.delete('/cart/item', deleteItem);

// cartRouter.post('/cart/item/quantity', editItem);

cartRouter.post('/cart/checkout', checkout);

cartRouter.post('/cart/guestCheckout', guestCheckout);

export default cartRouter;

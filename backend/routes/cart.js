import express from 'express';
const cartRouter = express();
import cartInfo from '../controllers/cartInfo.js';
import addItem from '../controllers/addItem.js';

cartRouter.get('/cart', cartInfo);

cartRouter.post('/cart/item', addItem);

export default cartRouter;

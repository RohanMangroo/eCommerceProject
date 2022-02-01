import express from 'express';
const cartRouter = express();
import cartInfo from '../controllers/cartInfo.js';

cartRouter.get('/cart', cartInfo);

export default cartRouter;

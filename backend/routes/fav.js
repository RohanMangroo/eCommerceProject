import express from 'express';
import updateFav from '../controllers/updateFav.js';
const favRouter = express();

favRouter.post('/fav', updateFav);

export default favRouter;

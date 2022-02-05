import express from 'express';
import updateFav from '../controllers/updateFav.js';
import getFavs from '../controllers/getFavs.js';
const favRouter = express();

favRouter.post('/fav', updateFav);

favRouter.get('/fav', getFavs);

export default favRouter;

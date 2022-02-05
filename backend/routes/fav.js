import express from 'express';
import updateFav from '../controllers/updateFav.js';
import getFavs from '../controllers/getFavs.js';
import deleteFav from '../controllers/deleteFav.js';
const favRouter = express();

favRouter.post('/fav', updateFav);

favRouter.get('/fav', getFavs);

favRouter.delete('/fav', deleteFav);

export default favRouter;

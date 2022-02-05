import express from 'express';
const infoRouter = express();
import getUserInfo from '../controllers/getUserInfo.js';

infoRouter.get('/info', getUserInfo);

export default infoRouter;

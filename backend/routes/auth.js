import express from 'express';
import signUp from '../controllers/signUp.js';
import logIn from '../controllers/logIn.js';
const authRouter = express();

authRouter.post('/signUp', signUp);

authRouter.post('/logIn', logIn);

export default authRouter;

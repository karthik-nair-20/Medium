import { Hono } from 'hono';
import { signup, signin, hello } from '../controller/userController';



export const userRouter = new Hono();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.get('/hello', hello);

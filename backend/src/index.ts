import { Context, Hono } from "hono";
import { userRouter } from "./routers/userRouters";
import { cors } from 'hono/cors';
import { postRouter } from "./routers/postRouters";

const app = new Hono();
app.use(cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/posts', postRouter);

app.get('/', (c: Context) => {
  return c.body("Hello hono!")
});


export default app;
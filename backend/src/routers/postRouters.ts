import { Hono } from 'hono';
import { getPosts, getUserPosts, createPost, getPost, updatePost, deletePost } from '../controller/postController';
import { authmiddleware } from '../middleware/auth';


export const postRouter = new Hono();

postRouter.get('/all-posts', getPosts);
postRouter.get('/posts', authmiddleware, getUserPosts);
postRouter.post('/create-post', authmiddleware, createPost);
postRouter.get('/post/:id', authmiddleware, getPost);
postRouter.put('/post/:id', authmiddleware, updatePost);
postRouter.delete('/post/:id', authmiddleware, deletePost);

import { Hono } from 'hono';
import { getPosts, getUserPosts, createPost, getPost, getPostById, updatePost, deletePost, uploadImage, getImage } from '../controller/postController';
import { authmiddleware } from '../middleware/auth';


export const postRouter = new Hono();

postRouter.get('/all-posts', getPosts);
postRouter.get('/posts', authmiddleware, getUserPosts);
postRouter.post('/create-post', authmiddleware, createPost);
postRouter.get('/post/:id', authmiddleware, getPost);
postRouter.get('all/:id', getPostById);
postRouter.put('/post/:id', authmiddleware, updatePost);
postRouter.delete('/post/:id', authmiddleware, deletePost);
postRouter.post('/upload', authmiddleware, uploadImage);
postRouter.get('/upload/:id', getImage);

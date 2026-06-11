import { Router } from 'express';

import {
  postList,
  createPostForm,
  createPost,
  createComment,
  createRating,
  followingPosts
} from '../controller/post.js';

import upload from '../middleware/multer.js';
import { authMiddleware } from '../middleware/auth.js';

const post = Router();

post.get('/', postList);

post.get('/crear', authMiddleware, createPostForm);
post.post('/crear', authMiddleware, upload.array('images', 5), createPost);
post.post('/comment', authMiddleware, createComment);
post.post('/rating', authMiddleware, createRating);
post.get('/following', authMiddleware, followingPosts);

export default post;
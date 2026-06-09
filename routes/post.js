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

const post = Router();

post.get('/', postList);

post.get('/crear', createPostForm);

post.post('/crear', upload.single('image'), createPost);

post.post('/comment', createComment);

post.post('/rating', createRating);

post.get('/following', followingPosts);

export default post;
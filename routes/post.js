import { Router } from 'express';

import {
  postList,
  createPostForm,
  createPost,
  createComment,
  followingPosts
} from '../controller/post.js';

const post = Router();

post.get('/', postList);

post.get('/crear', createPostForm);

post.post('/crear', createPost);

post.post('/comment', createComment);

post.get('/following', followingPosts);

export default post;
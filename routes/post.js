import { Router } from 'express';

import {
  postList,
  createPostForm,
  createPost,
  createComment
} from '../controller/post.js';

const post = Router();

post.get('/', postList);

post.get('/crear', createPostForm);

post.post('/crear', createPost);

post.post('/comment', createComment);

export default post;
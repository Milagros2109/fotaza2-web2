import { Router } from 'express';

import {
  postList,
  createPostForm,
  createPost
} from '../controller/post.js';

const post = Router();

post.get('/', postList);

post.get('/crear', createPostForm);

post.post('/crear', createPost);

export default post;
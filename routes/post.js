import { Router } from 'express';

import { postList } from '../controller/post.js';

const post = Router();

post.get('/', postList);

post.get('/crear', (req, res) => {
  res.render('post/crear');
});

export default post;
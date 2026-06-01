import { Router } from 'express';

import { postList } from '../controller/post.js';

const post = Router();

post.get('/', postList);

export default post;
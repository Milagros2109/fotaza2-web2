import { Router } from 'express';

import { userList } from '../controller/user.js';
import { followUser } from '../controller/Follower.js';

const user = Router();

user.get('/', userList);

user.post('/follow', followUser);

export default user;
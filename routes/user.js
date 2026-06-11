import { Router } from 'express';

import {
  userList,
  profile
} from '../controller/user.js';

import {
  followUser,
  unfollowUser
} from '../controller/Follower.js';

const user = Router();

user.get('/', userList);

user.get('/profile', profile);

user.post('/follow', followUser);

user.post('/unfollow', unfollowUser);

export default user;
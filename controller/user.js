import { User } from '../models/User.js';
import { Follower } from '../models/Follower.js';
import { Post } from '../models/Post.js';
import { Image } from '../models/Image.js';

export const userList = async (req, res) => {
  const currentUserId = req.session.user.id;

  const users = await User.findAll({
    attributes: ['id', 'firstName', 'lastName']
  });

  const follows = await Follower.findAll({
    where: {
      followerId: currentUserId
    }
  });

  const followingIds = follows.map(follow => follow.followingId);

  res.render('users', {
    pagina: 'Usuarios',
    users,
    followingIds,
    currentUserId
  });
};

export const profile = async (req, res) => {
  const currentUserId = req.session.user.id;

  const user = await User.findByPk(currentUserId, {
    attributes: ['id', 'firstName', 'lastName', 'email'],
    include: [
      {
        model: Post,
        include: [Image]
      }
    ]
  });

  const followersCount = await Follower.count({
    where: {
      followingId: currentUserId
    }
  });

  const followingCount = await Follower.count({
    where: {
      followerId: currentUserId
    }
  });

  const follows = await Follower.findAll({
    where: {
      followerId: currentUserId
    }
  });

  const followingIds = follows.map(follow => follow.followingId);

  const followingUsers = await User.findAll({
    where: {
      id: followingIds
    },
    attributes: ['id', 'firstName', 'lastName']
  });

  res.render('profile', {
    pagina: 'Mi perfil',
    user,
    followersCount,
    followingCount,
    followingUsers
  });
};
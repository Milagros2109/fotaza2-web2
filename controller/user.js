import { User } from '../models/User.js';
import { Follower } from '../models/Follower.js';

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
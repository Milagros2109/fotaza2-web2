import { Follower } from '../models/Follower.js';

export const followUser = async (req, res) => {
  const { followingId } = req.body;
  const followerId = req.session.user.id;

  if (Number(followingId) === Number(followerId)) {
    return res.redirect('/users');
  }

  try {
    const exists = await Follower.findOne({
      where: {
        followerId,
        followingId
      }
    });

    if (!exists) {
      await Follower.create({
        followerId,
        followingId
      });
    }

    res.redirect('/users');

  } catch (error) {
    console.error(error);
    res.redirect('/users');
  }
};

export const unfollowUser = async (req, res) => {
  const { followingId } = req.body;
  const followerId = req.session.user.id;

  try {
    await Follower.destroy({
      where: {
        followerId,
        followingId
      }
    });

    res.redirect('/users');

  } catch (error) {
    console.error(error);
    res.redirect('/users');
  }
};
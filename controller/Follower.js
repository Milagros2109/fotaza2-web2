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
       console.log('Creando seguimiento');

      await Follower.create({
        followerId,
        followingId
      });

    }else {
  console.log('Ya seguís a este usuario');
}

    res.redirect('/users');

  } catch (error) {

    console.error(error);

    res.redirect('/users');
  }
};
import { Op } from 'sequelize';
import { Post } from '../models/Post.js';
import { Comment } from '../models/Comment.js';
import { User } from '../models/User.js';
import { Follower } from '../models/Follower.js';

export const postList = async (req, res) => {

  const search = req.query.search || '';

  const where = search
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      }
    : {};

  const posts = await Post.findAll({
    where,
    include: [
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ['firstName']
          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.render('posts', {
    pagina: 'Publicaciones',
    posts,
    search
  });
};

export const createPostForm = (req, res) => {
  res.render('post/crear');
};

export const createPost = async (req, res) => {

  const { title, description } = req.body;

  try {

    await Post.create({
      title,
      description,
      userId: req.session.user.id
    });

    res.redirect('/posts');

  } catch (error) {

    console.error(error);

    res.render('post/crear');
  }
};

export const createComment = async (req, res) => {

  const { content, postId } = req.body;

  try {

    await Comment.create({
      content,
      postId,
      userId: req.session.user.id
    });

    res.redirect('/posts');

  } catch (error) {

    console.error(error);

    res.redirect('/posts');
  }
};
export const followingPosts = async (req, res) => {

  const userId = req.session.user.id;

  try {

    const follows = await Follower.findAll({
      where: {
        followerId: userId
      }
    });

    const followingIds = follows.map(f => f.followingId);

    const posts = await Post.findAll({
      where: {
        userId: followingIds
      },
      order: [['createdAt', 'DESC']]
    });

    res.render('following-posts', {
      pagina: 'Publicaciones seguidas',
      posts
    });

  } catch (error) {

    console.error(error);

    res.redirect('/posts');
  }
};
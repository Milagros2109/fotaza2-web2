import { Op } from 'sequelize';
import { Post } from '../models/Post.js';

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
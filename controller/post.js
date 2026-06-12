import { Op } from 'sequelize';
import { Post } from '../models/Post.js';
import { Comment } from '../models/Comment.js';
import { User } from '../models/user.js';
import { Follower } from '../models/Follower.js';
import { Image } from '../models/Image.js';
import { Rating } from '../models/Rating.js';

import { postValidation } from '../helpers/validations.js';

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
        model: User,
        attributes: ['firstName', 'lastName']
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ['firstName']
          }
        ]
      },
      {
        model: Image,
        include: [Rating]
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
  const validation = postValidation(req.body);

  if (!validation.success) {
    return res.status(400).render('post/crear', {
      errors: validation.errors,
      formValues: req.body
    });
  }

  const { title, description } = req.body;

  try {
    const post = await Post.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      userId: req.session.user.id
    });

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await Image.create({
          filename: file.filename,
          path: `/uploads/${file.filename}`,
          postId: post.id
        });
      }
    }

    res.redirect('/posts');

  } catch (error) {
    console.error(error);

    res.status(500).render('post/crear', {
      alert: {
        status: "error",
        text: "Hubo un error al crear la publicación"
      },
      formValues: req.body
    });
  }
};

export const createComment = async (req, res) => {
  const { content, postId } = req.body;

  if (!content || !content.trim()) {
    return res.redirect('/posts');
  }

  try {
    await Comment.create({
      content: content.trim(),
      postId,
      userId: req.session.user.id
    });

    res.redirect('/posts');

  } catch (error) {
    console.error(error);
    res.redirect('/posts');
  }
};

export const createRating = async (req, res) => {
  const { imageId, value } = req.body;
  const userId = req.session.user.id;

  try {
    const image = await Image.findByPk(imageId, {
      include: [Post]
    });

    if (!image) {
      return res.redirect('/posts');
    }

    // No permitir que el autor valore su propia imagen
    if (Number(image.Post.userId) === Number(userId)) {
      return res.redirect('/posts');
    }

    const exists = await Rating.findOne({
      where: {
        imageId,
        userId
      }
    });

    if (exists) {
      exists.value = value;
      await exists.save();
    } else {
      await Rating.create({
        imageId,
        userId,
        value
      });
    }

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

    const followingIds = follows.map(follow => follow.followingId);

    const posts = await Post.findAll({
      where: {
        userId: followingIds
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName']
        },
        {
          model: Image,
          include: [Rating]
        }
      ],
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
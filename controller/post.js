import { Post } from '../models/Post.js';

export const postList = (req, res) => {
  res.render('posts', {
    pagina:'Publicaciones'
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
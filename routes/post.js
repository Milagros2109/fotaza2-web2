import { Router } from 'express';

const post = Router();

post.get('/', (req, res) => {
  res.render('posts', {
    pagina: 'Publicaciones'
  });
});

export default post;s
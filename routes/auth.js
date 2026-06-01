import { Router } from 'express';

const auth = Router();

auth.get('/login', (req, res) => {
  res.render('auth/login', {
    pagina: 'Login'
  });
});

auth.post('/login', (req, res) => {
  res.redirect('/');
});

auth.get('/registro', (req, res) => {
  res.render('auth/registro', {
    pagina: 'Registro'
  });
});

auth.post('/registro', (req, res) => {
  res.redirect('/');
});

export default auth;
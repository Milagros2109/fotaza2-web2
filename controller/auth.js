export const loginForm = (req, res) => {
  res.render('auth/login', {
    pagina: 'Login'
  });
};

export const login = (req, res) => {
  res.redirect('/');
};

export const registroForm = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Registro'
  });
};

export const registro = (req, res) => {
  res.redirect('/');
};
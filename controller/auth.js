export async function loginForm(req, res) {
  res.render('auth/login');
}

export async function login(req, res) {
  res.redirect('/');
}

export async function registroForm(req, res) {
  res.render('auth/registro');
}

export async function registro(req, res) {
  res.redirect('/');
}

export async function logout(req, res) {
  res.redirect('/auth/login');
}
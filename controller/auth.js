import { User } from "../models/User.js";

export async function loginForm(req, res) {
  res.render('auth/login');
}

export async function login(req, res) {
  const { email, password } = req.body;

  const mail = email.trim();
  const pass = password.trim();

  if (!mail || !pass) {
    res.status(400).render('auth/login', {
      formValues: req.body
    });
    return;
  }

  try {
    const user = await User.findOne({
      where: {
        email: mail
      }
    });

    if (!user) {
      res.status(400).render('auth/login', {
        formValues: req.body
      });
      return;
    }

    const isValidated = await user.validatePassword(pass);

    if (!isValidated) {
      res.status(400).render('auth/login', {
        formValues: req.body
      });
      return;
    }

  } catch (error) {
    console.log('[!] Error en login: ', error);

    res.status(500).render('auth/login', {
      formValues: req.body
    });
    return;
  }

  res.redirect('/');
}

export async function registroForm(req, res) {
  res.render('auth/registro');
}

export async function registro(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const name = firstName.trim();
  const lastname = lastName.trim();
  const mail = email.trim();
  const pass = password.trim();

  if (!name || !lastname || !mail || !pass) {
    res.status(400).render('auth/registro', {
      formValues: req.body
    });
    return;
  }

  try {
    await User.create({
      firstName: name,
      lastName: lastname,
      email: mail,
      password: pass
    });

  } catch (error) {
    console.log('[!] Error en registro: ', error);

    res.status(500).render('auth/registro', {
      formValues: req.body
    });
    return;
  }

  res.redirect('/auth/login');
}

export async function logout(req, res) {
  res.redirect('/auth/login');
}
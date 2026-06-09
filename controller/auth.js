import { User } from "../models/User.js";

export async function loginForm(req, res) {
  res.render('auth/login');
}

export async function login(req, res) {

  const { email, password } = req.body;

  const mail = email.trim();
  const pass = password.trim();

  if (!mail || !pass) {
    return res.render('auth/login');
  }

  try {

    const user = await User.findOne({
      where: {
        email: mail
      }
    });

    if (!user) {
      return res.render('auth/login');
    }

    const isValidated = await user.validatePassword(pass);

    if (!isValidated) {
      return res.render('auth/login');
    }

    req.session.user = {
      id: user.id,
    };

    res.redirect('/');

  } catch (error) {

    console.error(error);

    res.render('auth/login');
  }
}

export async function registroForm(req, res) {
  res.render('auth/registro');
}

export async function registro(req, res) {

  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  const name = firstName.trim();
  const lastname = lastName.trim();
  const mail = email.trim();
  const pass = password.trim();

  if (!name || !lastname || !mail || !pass) {
    return res.render('auth/registro');
  }

  try {

    await User.create({
      firstName: name,
      lastName: lastname,
      email: mail,
      password: pass
    });

    res.redirect('/auth/login');

  } catch (error) {

    console.error(error);

    res.render('auth/registro');
  }
}

export async function logout(req, res) {

  if (req.session) {
    await req.session.destroy();
  }

  res.redirect('/auth/login');
}


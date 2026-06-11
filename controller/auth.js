import { User } from "../models/User.js";

import {
  loginValidation,
  registerValidation
} from "../helpers/validations.js";

export async function loginForm(req, res) {
  res.render('auth/login');
}

export async function login(req, res) {
  const validation = loginValidation(req.body);

  if (!validation.success) {
    return res.status(400).render('auth/login', {
      errors: validation.errors,
      formValues: req.body
    });
  }

  const { email, password } = req.body;

  const mail = email.trim();
  const pass = password.trim();

  try {
    const user = await User.findOne({
      where: {
        email: mail
      }
    });

    if (!user) {
      return res.status(400).render('auth/login', {
        errors: {
          email: ["El correo electrónico no coincide con ninguna cuenta."]
        },
        formValues: req.body
      });
    }

    const isValidated = await user.validatePassword(pass);

    if (!isValidated) {
      return res.status(400).render('auth/login', {
        errors: {
          password: ["La contraseña que ingresaste es incorrecta."]
        },
        formValues: req.body
      });
    }

    req.session.user = {
      id: user.id
    };

    return req.session.save((err) => {
      if (err) {
        console.log('Error al guardar sesión: ', err);

        return res.status(500).render('auth/login', {
          alert: {
            status: "error",
            text: "Hubo un error al procesar la sesión."
          },
          formValues: req.body
        });
      }

      return res.redirect('/');
    });

  } catch (error) {
    console.log('Error en login: ', error);

    return res.status(500).render('auth/login', {
      alert: {
        status: "error",
        text: "Hubo un error en el servidor al iniciar sesión."
      },
      formValues: req.body
    });
  }
}

export async function registroForm(req, res) {
  res.render('auth/registro');
}

export async function registro(req, res) {
  const validation = registerValidation(req.body);

  if (!validation.success) {
    return res.status(400).render('auth/registro', {
      errors: validation.errors,
      formValues: req.body
    });
  }

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

  try {
    await User.create({
      firstName: name,
      lastName: lastname,
      email: mail,
      password: pass
    });

  } catch (error) {
    console.log('[!] Error en registro: ', error);

    return res.status(500).render('auth/registro', {
      alert: {
        status: "error",
        text: "Hubo un error al crear el usuario. Puede que el email ya esté registrado."
      },
      formValues: req.body
    });
  }

  res.redirect('/auth/login');
}

export async function logout(req, res) {
  if (req.session) {
    await req.session.destroy();
  }

  res.redirect('/auth/login');
}
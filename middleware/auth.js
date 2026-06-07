import { User } from "../models/User.js";

export async function authMiddleware(req, res, next) {
  const sessionUser = req.session.user;

  if (!sessionUser) {
    res.redirect('/auth/login');
    return;
  }

  const userId = Number(sessionUser.id);

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName'],
    });

    if (!user) {
      res.redirect('/auth/login');
      return;
    }

    req.user = user;

    res.locals.currentUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.redirect('/auth/login');
    return;
  }

  next();
}
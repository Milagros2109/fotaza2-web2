import { User } from '../models/User.js';

export const userList = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'firstName', 'lastName']
  });

  res.render('users', {
    pagina: 'Usuarios',
    users
  });
};
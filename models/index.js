import sequelize from './config.js';
import { User } from './User.js';
import { Post } from './Post.js';

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexion a bd establecida');

    await sequelize.sync({ alter: true });
    console.log('Sincronizado de modelos');
  } catch (error) {
    console.error('Error en la conexion a la bd', error);
    throw error;
  }
}
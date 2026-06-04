import sequelize from './config.js';

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexion a bd establecida');
  } catch (error) {
    console.error('Error en la conexion a la bd', error);
    throw error;
  }
}
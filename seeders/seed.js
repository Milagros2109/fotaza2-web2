import 'dotenv/config';
import bcrypt from 'bcrypt';

import sequelize from '../models/config.js';
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { Tag } from '../models/Tag.js';

async function seed() {
  try {
    await sequelize.authenticate();

    const passwordHash = await bcrypt.hash('123456', 10);

    const user1 = await User.create({
      firstName: 'Jeremy',
      lastName: 'Prueba',
      email: 'jeremy@test.com',
      password: passwordHash
    });

    const user2 = await User.create({
      firstName: 'Aldair',
      lastName: 'Prueba',
      email: 'aldair@test.com',
      password: passwordHash
    });

    const tag1 = await Tag.create({
      title: 'Paisaje',
      color: 'verde'
    });

    const tag2 = await Tag.create({
      title: 'Fotografía',
      color: 'rojo'
    });

    await Post.create({
      title: 'Atardecer en la montaña',
      description: 'Primera publicación de prueba para Fotaza',
      userId: user1.id,
      tagId: tag1.id
    });

    await Post.create({
      title: 'Foto urbana',
      description: 'Publicación de ejemplo para probar el buscador',
      userId: user2.id,
      tagId: tag2.id
    });

    console.log('Datos de prueba cargados correctamente');
    process.exit();

  } catch (error) {
    console.error('Error cargando datos de prueba:', error);
    process.exit(1);
  }
}

seed();
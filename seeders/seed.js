import 'dotenv/config';
import bcrypt from 'bcrypt';

import sequelize from '../models/config.js';
import { initializeAssociations } from '../models/index.js';

import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { Tag } from '../models/Tag.js';
import { Image } from '../models/Image.js';
import { Follower } from '../models/Follower.js';

async function seed() {
  try {
    initializeAssociations();

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const passwordHash = await bcrypt.hash('12345', 10);

    const [user1] = await User.findOrCreate({
      where: { email: 'jeremy@test.com' },
      defaults: {
        firstName: 'Jeremy',
        lastName: 'Prueba',
        password: passwordHash
      }
    });

    const [user2] = await User.findOrCreate({
      where: { email: 'aldair@test.com' },
      defaults: {
        firstName: 'Aldair',
        lastName: 'Prueba',
        password: passwordHash
      }
    });

    const [tag1] = await Tag.findOrCreate({
      where: { title: 'Paisaje' },
      defaults: {
        color: 'verde'
      }
    });

    const [tag2] = await Tag.findOrCreate({
      where: { title: 'Fotografía' },
      defaults: {
        color: 'rojo'
      }
    });

    const [post1] = await Post.findOrCreate({
      where: { title: 'Atardecer en la montaña' },
      defaults: {
        description: 'Primera publicación de prueba para Fotaza'
      }
    });

    await post1.update({
      userId: user1.id,
      tagId: tag1.id
    });

    const [post2] = await Post.findOrCreate({
      where: { title: 'Foto urbana' },
      defaults: {
        description: 'Publicación de ejemplo para probar el buscador'
      }
    });

    await post2.update({
      userId: user2.id,
      tagId: tag2.id
    });

    const [image1] = await Image.findOrCreate({
      where: { path: '/uploads/atardecer.jpg' },
      defaults: {
        filename: 'atardecer.jpg'
      }
    });

    await image1.update({
      postId: post1.id
    });

    const [image2] = await Image.findOrCreate({
      where: { path: '/uploads/urbana.jpg' },
      defaults: {
        filename: 'urbana.jpg'
      }
    });

    await image2.update({
      postId: post2.id
    });

    await Follower.findOrCreate({
      where: {
        followerId: user1.id,
        followingId: user2.id
      }
    });

    console.log('Datos de prueba cargados correctamente');
    await sequelize.close();

  } catch (error) {
    console.error('Error cargando datos de prueba:', error);
    process.exit(1);
  }
}

seed();
import sequelize from "./config.js";
import { User } from "./user.js";
import { Post } from "./Post.js";
import { Image } from "./Image.js";
import { Tag } from "./Tag.js";
import { Comment } from './Comment.js';
import { Follower } from './Follower.js';
import { Rating } from './Rating.js';

let associationsInitialized = false;

export function initializeAssociations() {
  if (associationsInitialized) {
    return;
  }


  User.hasMany(Post, { foreignKey: 'userId' });
  Post.belongsTo(User, { foreignKey: 'userId' });

  Post.hasMany(Image, { foreignKey: 'postId' });
  Image.belongsTo(Post, { foreignKey: 'postId' });


  Tag.hasMany(Post, { foreignKey: 'tagId' });
  Post.belongsTo(Tag, { foreignKey: 'tagId' });

  User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Image.hasMany(Rating, { foreignKey: 'imageId' });
Rating.belongsTo(Image, { foreignKey: 'imageId' });

  associationsInitialized = true;
}

export async function connectDatabase() {
  try {
    initializeAssociations();

    await sequelize.authenticate();
    console.log('Conexion a bd establecida');

    await sequelize.sync({ alter: true });
    console.log('Sincronizado de modelos');

  } catch (error) {
    console.error('Error en la conexion a la bd', error);
    throw error;
  }
}

User.belongsToMany(User, {
  through: Follower,
  as: 'Following',
  foreignKey: 'followerId'
});

User.belongsToMany(User, {
  through: Follower,
  as: 'Followers',
  foreignKey: 'followingId'
});
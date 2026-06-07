import { Model, DataTypes } from 'sequelize';
import sequelize from './config.js';

export class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    createdAt: true,
    updatedAt: true,
  }
);
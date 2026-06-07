import { Model, DataTypes } from 'sequelize';
import sequelize from './config.js';

export class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    path: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    createdAt: true,
    updatedAt: true,
  }
);
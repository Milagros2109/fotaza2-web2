import { Model, DataTypes } from 'sequelize';
import sequelize from './config.js';

export class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'Follower',
    tableName: 'followers',
    createdAt: true,
    updatedAt: true
  }
);
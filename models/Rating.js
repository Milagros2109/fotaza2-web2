import { Model, DataTypes } from 'sequelize';
import sequelize from './config.js';

export class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
    createdAt: true,
    updatedAt: true
  }
);
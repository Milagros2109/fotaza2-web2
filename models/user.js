import { Model, DataTypes } from 'sequelize';
import sequelize from './config.js';
import bcrypt from 'bcrypt';

export class User extends Model {
  validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: 'Debe ser un email!',
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: true,
    updatedAt: true,
  }
);
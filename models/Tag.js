import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
);
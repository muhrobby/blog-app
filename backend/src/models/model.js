import Sequelize from "sequelize";
import { db } from "../config/database.js";

const dataType = Sequelize;

export const User = db.define(
  "users",
  {
    name: {
      type: dataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: dataType.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export const Post = db.define(
  "posts",
  {
    title: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 5,
      },
    },
    post_id: {
      type: dataType.STRING,

      allowNull: false,
      unique: true,
    },
    slug: {
      type: dataType.STRING,

      allowNull: false,
      unique: true,
    },
    content: {
      type: dataType.TEXT,

      allowNull: false,
    },
    thumbnail: {
      type: dataType.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Post);
Post.belongsTo(User);

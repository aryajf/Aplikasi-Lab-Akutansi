'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      }),
      Comment.belongsTo(models.Article, {
        as: 'article',
        foreignKey: 'article_id'
      })
    }
  };
  Comment.init({
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.hasMany(models.Comment, {
        as: 'comment',
        foreignKey: 'article_id'
      })
    }
  };
  Article.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    short_desc: DataTypes.STRING,
    long_desc: DataTypes.TEXT,
    cover: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
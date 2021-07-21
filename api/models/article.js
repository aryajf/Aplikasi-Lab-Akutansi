'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.hasMany(models.Comment, {
        as: 'article',
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
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate (models) {
      Book.belongsTo(models.User, { foreignKey: 'ownerId' })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book'
  })
  return Book
}

'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        ownerId: 1, // Assuming user with ID 1 owns this book
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Book 2',
        author: 'Author 2',
        description: 'Description 2',
        ownerId: 2, // Assuming user with ID 2 owns this book
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more book data as needed
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {})
  }
}

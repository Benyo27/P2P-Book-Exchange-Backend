const Sequelize = require('../utils/modules/sequelize')
const db = require('../../models')

const Book = db.Book
const User = db.User

const getBooks = async (req, res) => {
  try {
    const { title, author, description } = req.query

    const query = {}
    if (title) query.title = { [Sequelize.Op.like]: `%${title}%` }
    if (author) query.author = { [Sequelize.Op.like]: `%${author}%` }
    if (description) query.description = { [Sequelize.Op.like]: `%${description}%` }

    let books = await Book.findAll({ where: query })

    books = await Promise.all(books.map(async (book) => {
      const owner = await User.findByPk(book.ownerId)
      return {
        title: book.title,
        author: book.author,
        description: book.description,
        ownerEmail: owner.email
      }
    }))
    res.json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const postYourBook = async (req, res) => {
  try {
    const { title, author, description } = req.body
    const { id: ownerId } = req.user
    const book = await Book.create({ title, author, description, ownerId })
    res.json(book)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getYourBooks = async (req, res) => {
  try {
    const { id: ownerId } = req.user
    const books = await Book.findAll({ where: { ownerId } })
    res.json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const deleteYourBook = async (req, res) => {
  try {
    const { id: ownerId } = req.user
    const { id } = req.params
    const book = await Book.findOne({ where: { id, ownerId } })
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    await book.destroy()
    res.json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getBooks,
  postYourBook,
  getYourBooks,
  deleteYourBook
}

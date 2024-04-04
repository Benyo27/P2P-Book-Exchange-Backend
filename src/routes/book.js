const { createRouter } = require('../utils/modules/express')
const { getBooks, postYourBook, getYourBooks, deleteYourBook } = require('../controllers/book')
const authenticateUser = require('../middlewares/authenticateUser')

const router = createRouter()

router.get('/', getBooks)
router.post('/post', authenticateUser, postYourBook)
router.get('/my-books', authenticateUser, getYourBooks)
router.delete('/my-books/:id', authenticateUser, deleteYourBook)

module.exports = router

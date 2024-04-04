const { createRouter } = require('../utils/modules/express')
const { register, login, profile } = require('../controllers/user')
const authenticateUser = require('../middlewares/authenticateUser')

const router = createRouter()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authenticateUser, profile)

module.exports = router

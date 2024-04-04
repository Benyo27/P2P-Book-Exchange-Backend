const { createApp } = require('./utils/modules/express')
const cors = require('./utils/modules/cors')

const app = createApp()

// const userRouter = require('./routes/user.routes')
const bookRouter = require('./routes/book')
const userRouter = require('./routes/user')

const requestLogger = require('./middlewares/requestLogger')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(requestLogger)

app.use('/', userRouter)
app.use('/books', bookRouter)

app.use(errorHandler)

module.exports = app

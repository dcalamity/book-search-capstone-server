require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
// const winston = require('winston')
const usersRouter = require('./users/users-router')
const booksRouter = require('./books/books-router')
const commentsRouter = require('./comments/comments-router')
const bookCollectionRouter = require('./book_collections/book_collections-router')


const app = express()
// const jsonParser = express.json()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

// const logger = winston.createLogger({
// level: 'info',
// format: winston.format.json(),
// transports: [
//     new winston.transports.File({ filename: 'info.log' })
// ]
// });

// if (NODE_ENV !== 'production') {
// logger.add(new winston.transports.Console({
//     format: winston.format.simple()
// }));
// }

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())


app.use('/api/users', usersRouter)
app.use('/api/books', booksRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/book_collections', bookCollectionRouter)

// app.get('/api/books', (req, res) => {
//     res.status(200);
//     res.send(noteful.books)
// })

// app.get('/api', (req, res) => {
//     res.send(noteful)
// })

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app
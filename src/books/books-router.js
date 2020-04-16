const path = require('path')
const express = require('express')
const xss = require('xss')
const BooksService = require('./books-service')

const booksRouter = express.Router()
const jsonParser = express.json()

const serializeBook = book => ({
    id: book.id,
    book: xss(book.book),
})

booksRouter
    .route('/books/all')
    .get((req, res, next) => {
        console.log('shot')
        BooksService.getAllBooks(
            req.app.get('db')
        )
            .then(books => {
                res.json(books)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { folder_name } = req.body
        const newBook = { folder_name }

        for (const [key, value] of Object.entries(newBook)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        BooksService.insertBook(
            req.app.get('db'),
            newBook
        )
            .then(folder => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder.id}`))
                    .json(serializeBook(folder))
            })
            .catch(next)
    })

booksRouter
    .route('/:folder_id')
    .all((req, res, next) => {
        BooksService.getById(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: { message: `folder doesn't exist` }
                    })
                }
                res.folder = folder // save the folder for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeBook(res.folder))
    })
    .delete((req, res, next) => {
        BooksService.deleteBook(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = booksRouter
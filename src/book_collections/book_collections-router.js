const path = require('path')
const express = require('express')
const xss = require('xss')
const BookCollectionsService = require('./book_collections-service')

const bookCollectionsRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = book_collection => ({
    id: book_collection.id,
    book_collection_name: xss(book_collection.book_collection_name),
})

bookCollectionsRouter
    .route('/')
    .get((req, res, next) => {
        BookCollectionsService.getAllBookCollections(
            req.app.get('db')
        )
            .then(book_collections => {
                res.json(book_collections)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { book_collection_name } = req.body
        const newFolder = { book_collection_name }

        for (const [key, value] of Object.entries(newFolder)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        BookCollectionsService.insertFolder(
            req.app.get('db'),
            newFolder
        )
            .then(book_collection => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${book_collection.id}`))
                    .json(serializeFolder(book_collection))
            })
            .catch(next)
    })

bookCollectionsRouter
    .route('/:book_collection_id')
    .all((req, res, next) => {
        BookCollectionsService.getById(
            req.app.get('db'),
            req.params.book_collection_id
        )
            .then(book_collection => {
                if (!book_collection) {
                    return res.status(404).json({
                        error: { message: `book_collection doesn't exist` }
                    })
                }
                res.book_collection = book_collection // save the book_collection for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeFolder(res.book_collection))
    })
    .delete((req, res, next) => {
        BookCollectionsService.deleteFolder(
            req.app.get('db'),
            req.params.book_collection_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = bookCollectionsRouter
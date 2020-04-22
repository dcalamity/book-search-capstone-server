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
//byCollectionId
//showBooksByCollectionId done
//createByCollectionId done

//byBookId
//getBookByBookId done
//updateByBookId
//deleteByBookId  done

booksRouter
    .route('/collection/:collection_id')
    .get((req, res, next) => {
        console.log('shot')
        console.log('collectionID:',req.params.collection_id)
        BooksService.getAllBooksByCollectionId(
            req.app.get('db'),
            req.params.collection_id
        )
            .then(books => {
                if (!books) {
                    return res.status(404).json({
                        error: {
                            message: `books don't exist`
                        }
                    })
                }
                res.json(books)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {
            collection_id,
            finished,
            title,
            author,
            genre,
            isbn_id,
            year_published,
            description,
            bookmark_page
        } = req.body

        const payload = {
            collection_id,
            finished,
            title,
            author,
            genre,
            isbn_id,
            year_published,
            description,
            bookmark_page
        }
        console.log("payload:", payload)

        for (const [key, value] of Object.entries(payload)) {
            if (value == null) {
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
            }
        }

        BooksService.insertBook(
                req.app.get('db'),
                payload
            )
            .then(book => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${book.id}`))
                    .json(book)
            })
            .catch(next)
    })

booksRouter
    .route('/book/:book_id')
    .get((req, res, next) => {
        // console.log(req.params.book_id, "req.params.book_id")
        BooksService.getByBookId(
                req.app.get('db'),
                req.params.book_id
            )
            .then(books => {
                if (!books) {
                    return res.status(404).json({
                        error: {
                            message: `books don't exist`
                        }
                    })
                }
                res.json(books)
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const {
            id,
            collection_id,
            finished,
            title,
            author,
            genre,
            isbn_id,
            year_published,
            description,
            bookmark_page
        } = req.body
        const recordToUpdate = {
            id,
            collection_id,
            finished,
            title,
            author,
            genre,
            isbn_id,
            year_published,
            description,
            bookmark_page
        }
        console.log(id, 'collection_id patch')
        console.log(recordToUpdate, 'recordToUpdate patch')
        BooksService.updateBookByBookId(
                req.app.get('db'),
                req.params.book_id,
                recordToUpdate
            )
            .then(numRowsAffected => {
                console.log(numRowsAffected, 'numRowsAffected patch')
                res.status(204).end()
            })
            .catch(next)
    })
    
    .delete((req, res, next) => {
        BooksService.deleteBookByBookId(
            req.app.get('db'),
            req.params.book_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = booksRouter
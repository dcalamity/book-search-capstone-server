const path = require('path')
const express = require('express')
const xss = require('xss')
const BookCollectionsService = require('./book_collections-service')

const BookCollectionsRouter = express.Router()
const jsonParser = express.json()

const serializeCollection = book_collection => ({
    id: book_collection.id,
    book_collection: xss(book_collection.book_collection),
})

BookCollectionsRouter
    .route('/all')
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
        const {
            user_id,
            collection_name
        } = req.body
        const payload = {
            user_id,
            collection_name
        }
        // console.log("payload:", payload)

        for (const [key, value] of Object.entries(payload)) {
            if (value == null) {
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    }
                })
            }
        }

        BookCollectionsService.insertCollection(
                req.app.get('db'),
                payload
            )
            .then(book_collection => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${book_collection.id}`))
                    .json(serializeCollection(book_collection))
            })
            .catch(err => {
                console.log(err);
            });
    })

BookCollectionsRouter
    .route('/user/:user_id')
    .all((req, res, next) => {
        // console.log(req.params.user_id, "req.params.user_id")
        BookCollectionsService.getByUserId(
                req.app.get('db'),
                req.params.user_id
            )
            .then(book_collection => {
                // console.log(book_collection, 'book_collection')
                if (!book_collection) {
                    return res.status(404).json({
                        error: {
                            message: `user_id doesn't exist`
                        }
                    })
                }
                res.json(book_collection)
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeCollection(res.book_collection))
    })
    .delete((req, res, next) => {
        BookCollectionsService.deleteCollectionByUserId(
                req.app.get('db'),
                req.params.user_id
            )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

BookCollectionsRouter
    .route('/collection/:collection_id')
    
    .get((req, res, next) => {
        console.log(req.params.collection_id, "req.params.collection_id")
        BookCollectionsService.getByCollectionId(
                req.app.get('db'),
                req.params.collection_id
            )
            .then(book_collection => {
                console.log(book_collection, 'book_collection')
                if (!book_collection) {
                    return res.status(404).json({
                        error: {
                            message: `collection_id doesn't exist`
                        }
                    })
                }
                res.json(book_collection)
                next()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const {
            id,
            collection_name
        } = req.body
        const recordToUpdate = {
            collection_name
        }
        // console.log(id, 'collection_id patch')
        // console.log(collection_name, 'collection_name patch')
        BookCollectionsService.updateCollectionByCollectionId(
                req.app.get('db'),
                req.params.collection_id,
                recordToUpdate
            )
            .then(numRowsAffected => {
                // console.log(numRowsAffected, 'numRowsAffected patch')
                res.status(204).end()
            })
            .catch(next)
    })

    .delete((req, res, next) => {
        console.log('delete called')
        BookCollectionsService.deleteCollectionByCollectionId(
                req.app.get('db'),
                req.params.collection_id
            )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = BookCollectionsRouter
const path = require('path')
const express = require('express')
const xss = require('xss')
const CommentsService = require('./comments-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

const serializeComment = comment => ({
    id: comment.id,
    comment_name: xss(comment.comment_name),
})

commentsRouter
    .route('/')
    .get((req, res, next) => {
        CommentsService.getAllComments(
            req.app.get('db')
        )
            .then(comments => {
                res.json(comments)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { comment_name } = req.body
        const newComment = { comment_name }

        for (const [key, value] of Object.entries(newComment)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        CommentsService.insertComment(
            req.app.get('db'),
            newComment
        )
            .then(comment => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${comment.id}`))
                    .json(serializeComment(comment))
            })
            .catch(next)
    })

commentsRouter
    .route('/:comment_id')
    .all((req, res, next) => {
        CommentsService.getById(
            req.app.get('db'),
            req.params.comment_id
        )
            .then(comment => {
                if (!comment) {
                    return res.status(404).json({
                        error: { message: `comment doesn't exist` }
                    })
                }
                res.comment = comment // save the comment for the next middleware
                next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeComment(res.comment))
    })
    .delete((req, res, next) => {
        CommentsService.deleteComment(
            req.app.get('db'),
            req.params.comment_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = commentsRouter
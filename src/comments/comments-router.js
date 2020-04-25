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

//searchCommentsByBookID done
//addCommentByBookId done 
//deleteByCommentId done




commentsRouter
    .route('/book/:book_id')
    .get((req, res, next) => {
        console.log('get by book id shot')
        console.log("req.params.book_id")
        CommentsService.getCommentsByBookID(
            req.app.get('db'),
            req.params.book_id
        )
            .then(comments => {
                res.json(comments)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { book_id, book_comment } = req.body
        const newComment = { book_id, book_comment }

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
            .catch(err => {
                console.log(err);
            });
    })

    

commentsRouter
    .route('/comment/:comment_id')
    .get((req, res, next) => {
        res.json(serializeComment(res.comment))
    })
    .delete((req, res, next) => {
        console.log('delete by comment id called')
        CommentsService.deleteByCommentsId(
                req.app.get('db'),
                req.params.comment_id
            )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = commentsRouter
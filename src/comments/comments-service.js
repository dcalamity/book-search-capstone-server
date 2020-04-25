const CommentsService = {
    getAllFolders(knex) {
        // console.log(knex)
        return knex.select('*').from('noteful_folders')
    },
    insertComment(knex, newComment) {
        return knex
            .insert(newComment)
            .into('comments')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getCommentsByBookID(knex, book_id){
        return knex.from('comments').select('*').where('book_id', book_id)
    },

    deleteByCommentsId(knex, comment_id) {
        return knex('comments')
            .where('id', comment_id)
            .delete()
    },
    getCommentsByBookID(knex, book_id) {
        return knex.from('comments').select('*').where('book_id', book_id)
    },
    // updateFolder(knex, id, newFolderFields) {
    //     return knex('noteful_folders')
    //         .where({ id })
    //         .update(newFolderFields)
    // },
}

module.exports = CommentsService
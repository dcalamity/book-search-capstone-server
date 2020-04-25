const CommentsService = {
    getAllFolders(knex) {
        // console.log(knex)
        return knex.select('*').from('noteful_folders')
    },
    insertComment(knex, comment) {
        return knex
            .insert(comment)
            .into('comments')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFolder(knex, id) {
        return knex('noteful_folders')
            .where({ id })
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
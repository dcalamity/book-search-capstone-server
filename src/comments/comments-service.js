const FoldersService = {
    getAllFolders(knex) {
        // console.log(knex)
        return knex.select('*').from('noteful_folders')
    },
    insertFolder(knex, newFolder) {
        return knex
            .insert(newFolder)
            .into('noteful_folders')
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

module.exports = FoldersService
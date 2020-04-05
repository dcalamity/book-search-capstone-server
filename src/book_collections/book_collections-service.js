const BookCollectionsService = {
    getAllBookCollections(knex) {
        console.log(" get all function called", knex)
        return knex.select('*').from('book_collection')
    },
    insertCollection(knex, payload) {
        return knex
            .insert(payload)
            .into('book_collection')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteCollection(knex, id) {
        return knex('noteful_folders')
            .where({ id })
            .delete()
    },
    getById(knex, id) {
        return knex.from('noteful_folders').select('*').where('id', id).first()
    },
    // updateFolder(knex, id, newFolderFields) {
    //     return knex('noteful_folders')
    //         .where({ id })
    //         .update(newFolderFields)
    // },
}

module.exports = BookCollectionsService
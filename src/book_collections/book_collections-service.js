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
        return knex('book_collection')
            .where({ id })
            .delete()
    },
    getById(knex, user_id) {
        return knex.from('book_collection').select('*').where('user_id', user_id)
    },
    // updateFolder(knex, id, newFolderFields) {
    //     return knex('book_collection')
    //         .where({ id })
    //         .update(newFolderFields)
    // },
}

module.exports = BookCollectionsService
const BookCollectionsService = {
    //ALL 
    getAllBookCollections(knex) {
        // console.log(" get all function called", knex)
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
    //USER
    deleteCollectionByUserId(knex, user_id) {
        return knex('book_collection')
            .where('user_id', user_id)
            .delete()
    },
    getByUserId(knex, user_id) {
        return knex.from('book_collection').select('*').where('user_id', user_id)
    },
    //COLLECTION
    getByCollectionId(knex, collection_id) {
        return knex.from('book_collection').select('*').where('id', collection_id)
    },
    deleteCollectionByCollectionId(knex, collection_id) {
        return knex('book_collection')
            .where('id', collection_id)
            .delete()
    },
    updateCollectionByCollectionId(knex, id, recordToUpdate) {
        return knex('book_collection')
            .where({ id })
            .update(recordToUpdate)
    },
}

module.exports = BookCollectionsService
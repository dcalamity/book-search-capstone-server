const BooksService = {
    getAllBooks(knex) {
        console.log(knex)
        return knex.select('*').from('book')
    },
    getAllBooksByCollectionId(knex, collection_id) {
        return knex.from('book').select('*').where('collection_id', collection_id)
    },
    insertBook(knex, newComment) {
        return knex
            .insert(newComment)
            .into('comments')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteBookByBookId(knex, book_id) {
        return knex('book')
            .where( 'id', book_id )
            .delete()
    },
    getByBookId(knex, book_id) {
        // console.log(book_id, 'book_id')
        return knex.from('book').select('*').where('id', book_id)
    },
    // updateBook(knex, id, newBookFields) {
    //     return knex('book')
    //         .where({ id })
    //         .update(newBookFields)
    // },
}

module.exports = BooksService
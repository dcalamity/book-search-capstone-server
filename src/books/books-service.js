const BooksService = {
    getAllBooks(knex) {
        console.log(knex)
        return knex.select('*').from('book')
    },
    getAllBooksByCollectionId(knex, collection_id) {
        return knex.from('book').select('*').where('collection_id', collection_id)
    },
    insertBook(knex, newBook) {
        return knex
            .insert(newBook)
            .into('book')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteBook(knex, id) {
        return knex('book')
            .where({ id })
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
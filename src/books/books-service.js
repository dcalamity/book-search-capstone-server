const BooksService = {
    getAllBooks(knex) {
        console.log(knex)
        return knex.select('*').from('book')
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
    getById(knex, id) {
        return knex.from('book').select('*').where('id', id).first()
    },
    // updateBook(knex, id, newBookFields) {
    //     return knex('book')
    //         .where({ id })
    //         .update(newBookFields)
    // },
}

module.exports = BooksService
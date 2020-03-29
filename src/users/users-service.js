const UsersService = {
    getAllUsers(knex) {
        // console.log(knex)
        return knex.select('*').from('user')
    },
    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteUser(knex, id) {
        return knex('user')
            .where({ id })
            .delete()
    },
    getById(knex, id) {
        return knex.from('user').select('*').where('id', id).first()
    },
    // updateUser(knex, id, newUserFields) {
    //     return knex('user')
    //         .where({ id })
    //         .update(newUserFields)
    // },
}

module.exports = UsersService
const client = require('./client');
const bcrypt = require('bcrypt');

//database functions: user

async function createUser({ first_name, last_name, email, address, username, password }) {

    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            INSERT INTO users first_name, last_name, email, address, username, password)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `,
            [first_name, last_name, email, address, username, hashedPassword]
        );
        delete user.password;
        console.log(user);
        return user;
    } catch (error) {
        console.error("error creating user", error);
        throw error;
    }
}

//getUserById (users.id) | returning: (user Object)

async function getUserById({id}) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            SELECT id, username
            FROM users
            WHERE id = $1;
            `
            [id]
        );
        return user;
    } catch (error) {
        console.error("error retrieving user", error);
        throw error;
    }
} 

//export functions

module.exports = {
    createUser,
    getUserById
  }
  
const client = require("./client");
const bcrypt = require("bcrypt");

//database functions: user

async function createUser({
  first_name,
  last_name,
  email,
  address,
  username,
  password,
}) {
  // console.log("params:", first_name, last_name, email, address, username, password)
  const SALT_COUNT = 10;
  const hashed_password = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(first_name, last_name, email, address, username, password)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `,
      [first_name, last_name, email, address, username, hashed_password]
    );
    delete user.password;
    console.log("user", user);
    return user;
  } catch (error) {
    console.error("error creating user", error);
    throw error;
  }
}

// loginUser (username, password) | return (token, userId)

async function loginUser({ username, password }) {
  const tempUser = await getUserByUsername(username);
  const hashedPassword = tempUser.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordsMatch) {
    // let user = { id: tempUser.id, username: tempUser.username };
    delete tempUser.password;
    return tempUser;
  } else {
    console.log("Error getting user!");
  }
}

//getUserById (users.id) | returning: (user Object)

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("Error getting user by username!");
    throw error;
  }
}

async function getUserById({ id }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, username
            FROM users
            WHERE id = $1;
            `,
      [id]
    );
    return user;
  } catch (error) {
    console.error("error retrieving user", error);
    throw error;
  }
}

//updateUser updating/return
//(first_name, last_name, username, email, address)

async function updateUser({ id, ...fields }) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `,
      Object.values(fields)
    );
    return user;
  } catch (error) {
    console.error("Error Retrieving User", error);
    throw error;
  }
}

async function destroyUser(id) {
  await client.query(
    `
      DELETE FROM users
       WHERE id=${id};
      `
  );
  await client.query(
    `
     DELETE FROM users
      WHERE id=${id};
      `
  );
}

//export functions

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  loginUser,
  updateUser,
  destroyUser,
};

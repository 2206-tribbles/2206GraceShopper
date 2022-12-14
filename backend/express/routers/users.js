const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  getUserByUsername,
  createUser,
  getUserById,
  destroyUser,
  loginUser,
  getAllUsers,
} = require("../../db");
// /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  console.log("registering user...");
  const { first_name, last_name, email, address, username, password } =
    req.body;
  // const check = { first_name, last_name, email, address, username, password };
  // if (!check) {
  //   next({
  //     name: "nullError",
  //     message: "No open fields allowed",
  //   });
  // }
  try {
    const _user = await getUserByUsername(username);
    console.log("getting user by username...", _user);
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
      first_name,
      last_name,
      email,
      address,
      username,
      password,
    });
    console.log("create user:", user);
    const userId = user.id;
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
      token,
      userId,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const _user = await getUserByUsername(username);
    if (!_user) {
      next({
        error: "Username does not exist.  Please Register First",
        message: "Username does not exist. Please Register First",
        name: "IncorrectCredentialsError",
      });
    }
    // Make sure password correct
    const user = await loginUser({ username, password });
    if (!user) {
      next({
        error: "Incorrect username or password",
        message: "Username or password is incorrect",
        name: "IncorrectCredentialsError",
      });
    }
    const jwtToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    console.log(jwtToken);
    res.send({
      message: "you're logged in!",
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
usersRouter.delete("/:users_id", async (req, res, next) => {
  const id = req.params.users_id;
  console.log(id, "line94");
  try {
    const user = await getUserById({ id });
    console.log(user, id, "line 97");
    if (user.username === req.body.username) {
      await destroyUser(id);
      res.send(user);
    } else {
      res.status(403);
      console.log(req.body.username, "line104");
      next({
        name: "403Error",
        error: "An Error Occured",
        message: `User ${req.body.username} is not allowed to delete ${req.body.username}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  // Grab token from the request headers
  const prefix = "Bearer ";
  const token = req.headers.authorization.slice(prefix.length);
  const userInfo = jwt.decode(token);
  console.log(token, userInfo);
  try {
    if (userInfo) {
      console.log("userInfo: ", userInfo);
      const user = await getUserById(userInfo);
      res.json(user);
    } else {
      next({
        error: "No Token Exists",
        message: "No Token Exists",
        name: "No Token Exists",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = usersRouter;

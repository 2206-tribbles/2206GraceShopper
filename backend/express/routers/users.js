const express = require('express');
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser } = require("../../db")
// /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    console.log("registering user...")
    const { first_name, last_name, email, address, username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
      console.log("getting user by username...", _user)
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      const user = await createUser({
        first_name, 
        last_name, 
        email, 
        address, 
        username, 
        password
      });
      console.log("create user:", user)
      const token = jwt.sign({ 
        id: user.id, 
        username: user.username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({ 
        message: "thank you for signing up",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });
  
  module.exports = usersRouter;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db')
const { JWT_SECRET } = process.env;

// GET /api/health
router.get('/health', async (req, res) => {
    res.send({message: 'You are healthy'});
});

router.use(async (req, res, next) => {
  console.log("verifying authorization...")
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          req.user = await getUserById(id);
          
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });
//current path for users: /api/users
const usersRouter = require("./routers/users");
router.use("/users", usersRouter)

// const cartsRouter = require("./routers/carts");
// router.use("/carts", cartsRouter)

// const cartsProductsRouter = require("./cartsProducts"); 
// router.use("/cartsProductsRouter", cartsProductsRouter)

// const productsRouter = require("./products"); 
// router.use("/productsRouter", productsRouter)

const reviewsRouter = require("./routers/reviews"); 
router.use("/reviews", reviewsRouter)


module.exports = router;

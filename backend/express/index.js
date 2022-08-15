const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db')
const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
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
// GET /api/health
router.get('/health', async (req, res) => {
    res.send({message: 'You are healthy'});
});


module.exports = router;

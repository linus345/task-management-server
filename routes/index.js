const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const middleware = require('../middleware/middleware');


router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/logout', middleware.isAuthenticated, userController.logout);

module.exports = router;
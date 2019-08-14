const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const middleware = require('../middleware/middleware');

router.get('/users', userController.getAll);

router.post('/verify', middleware.isAuthenticated, userController.verifyToken);

module.exports = router;
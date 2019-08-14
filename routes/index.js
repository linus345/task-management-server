const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const errorHandler = require('../handlers/errorHandler');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/logout', function(req, res){
  req.logout();
  if(!req.user) {
    res.json({
      success: true,
      message: 'Logged out',
    });
  } else {
    return errorHandler(res, null, 400, 'Something went wrong when logging out');
  }
});

module.exports = router;
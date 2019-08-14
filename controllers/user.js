const User = require('../models/user');
const bcrypt = require('bcrypt');
const errorHandler = require('../handlers/errorHandler');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
  User.find({}, (error, users) => {
    if(error) {
      return errorHandler(res, error, 400, 'Something went wrong');
    };
    res.json({
      success: true,
      message: 'Successfully fetched all users',
      users,
    });
    return;
  });
}

exports.verifyToken = function(req, res) {
  const { _id, email, username } = req.user;
  res.json({
    success: true,
    message: 'Successfully fetched all users',
    user: {
      id: _id,
      email,
      username,
    },
  });
}

exports.signup = function(req, res) {
  const { _id, username, email, password } = req.body;
  
  // check to see if password is invalid before hashing it
  if(!password || password.length < 6) {
    return errorHandler(res, null, 400, 'Password must be at least 6 characters long');
  }

  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if(error) {
      return errorHandler(res, error, 400, 'Something went wrong');
    }
    User.create({ username, email, password: hashedPassword }, (error, user) => {
      if(error) {
        return errorHandler(res, error, 400, 'Something went wrong during signup');
      };
      res.json({
        success: true,
        message: 'Successfully created user',
        user: {
          id: _id,
          email,
          username,
        },
      });
      return;
    });
  });
}

exports.login = async function(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user) {
      req.user = null;
      return errorHandler(res, null, 404, 'Wrong username or password');
    }

    const match = await user.verifyPassword(password);
    if(!match) {
      return errorHandler(res, null, 404, 'Wrong username or password');
    }
    // login succeeded 
    req.user = user;

    // create json web token
    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username,
    }

    jwt.sign({ payload }, process.env.JWT_SECRET_KEY, { expiresIn: '300s' }, (error, token) => {
      if(error) {
        return errorHandler(res, error, 400, 'Something went wrong when signing token');
      }
      res.json({
        success: true,
        message: 'Successfully logged in',
        user: payload,
        token,
      });
      return;
    });

  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong during login');
  }
}
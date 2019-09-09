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
    message: 'Token is valid',
    user: {
      id: _id,
      email,
      username,
    },
  });
}

exports.signup = async function(req, res) {
  const { username, email, password } = req.body;
  
  // check to see if password is invalid before hashing it
  // I have to check it here because otherwise it will check
  // the hashed password
  if(!password || password.length < 6) {
    return errorHandler(res, null, 400, 'Password must be at least 6 characters long');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.json({
      success: true,
      message: 'Account created',
      redirect: '/login',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
    return;
  } catch(error) {
    return errorHandler(res, error, 500, 'Something went wrong');
  }
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
      lastLogout: user.lastLogout,
    }

    jwt.sign({ payload }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
      if(error) {
        return errorHandler(res, error, 400, 'Something went wrong when signing token');
      }
      res.json({
        success: true,
        message: 'Logged in',
        redirect: '/',
        user: payload,
        token,
      });
      return;
    });

  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong during login');
  }
}

exports.logout = async function(req, res){
  try {
    const user = await User.findById(req.user._id);
    if(!user) throw new Error('No user found');
    
    // log out the user after setting lastLogout to Date.now
    user.lastLogout = Date.now();
    user.markModified('lastLogout');

    await user.save({ validateBeforeSave: false });

    req.user = null;
    res.json({
      success: true,
      message: 'Logged out',
      redirect: '/login',
    });
  } catch(error) {
    console.log('error', error);
    return errorHandler(res, error, 400, 'Something went wrong when logging out');
  }
}
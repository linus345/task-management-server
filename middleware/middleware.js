const User = require('../models/user');
const errorHandler = require('../handlers/errorHandler');
const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = function(req, res, next) {
  if(req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const bearerHeader = req.get('Authorization');
  if(!bearerHeader) {
    return errorHandler(res, null, 400, 'No authorization header present');
  }
  const bearerToken = bearerHeader.split(' ')[1];
  jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if(error) {
      req.user = null;
      return errorHandler(res, error, 401, 'Invalid token');
    }
    req.user = decoded.payload;
    return next();
  });
}

// todo
// module.exports.isAuthorized = async function(req, res, next) {
  
// }
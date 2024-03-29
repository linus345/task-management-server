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
    return errorHandler(res, null, 400, 'No authorization header present', '/login');
  }
  const bearerToken = bearerHeader.split(' ')[1];
  jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, async (error, decoded) => {
    if(error) {
      req.user = null;
      return errorHandler(res, error, 401, 'Invalid token', '/login');
    }
    // get user
    try {
      const user = await User.findById(decoded.payload._id);
      if(!user) throw new Error('Invalid token');
      // check if valid
      const lastLogout = new Date(decoded.payload.lastLogout);
      if(user.lastLogout.getTime() === lastLogout.getTime()) {
        // vaild
        req.user = decoded.payload;
        return next();
      } else {
        throw new Error('Token invalid due to logout');
      }
    } catch(error) {
      return errorHandler(res, error, 404, 'Something went wrong when validating user', '/login');
    }
  });
}

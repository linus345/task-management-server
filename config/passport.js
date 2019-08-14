const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  passport.use(new LocalStrategy({
      usernameField: 'email',
    },
    async function(email, password, done) {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      const isMatch = await user.verifyPassword(password);
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    }
  ));
}

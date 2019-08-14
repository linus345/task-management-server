const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/////////////
// schema //
///////////
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [25, 'Username can\'t be longer than 25 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board'}],
});

userSchema.methods.verifyPassword = async function(password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return new Promise(resolve => {
    resolve(isMatch);
  });
}

//////////////////////////
// validator functions //
////////////////////////

// email
userSchema.path('email').validate(function(email) {
  return /\S+@\S+\.\S+/.test(email);
}, '{VALUE} is not a valid email address');

userSchema.path('email').validate(async function(email) {
  const found = await this.model('User').findOne({ email });
  return !found;
}, 'Email already exists');

// username
userSchema.path('username').validate(function(username) {
  return !/\s/g.test(username);
}, 'Whitespace isn\'t allowed');

userSchema.path('username').validate(async function(username) {
  const found = await this.model('User').findOne({ username });
  return !found;
}, 'Username already exists');


module.exports = mongoose.model('User', userSchema);
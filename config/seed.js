const User = require('../models/user');
const bcrypt = require('bcrypt');

const users = [
  {
    email: 'john@gmail.com',
    username: 'johndoe',
    password: 'pass1'
  },
  {
    email: 'jane@gmail.com',
    username: 'janedoe',
    password: 'pass12'
  },
  {
    email: 'linus@gmail.com',
    username: 'linus345',
    password: 'pass123'
  },
  {
    email: 'test@gmail.com',
    username: 'test123',
    password: 'pass1234'
  },
];

module.exports = function seed() {
  // seed database with users
  users.forEach(user => {
    const { email, username, password } = user;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      User.create({ username, email, password: hashedPassword }, (err, newUser) => {
        if(err) return err;
      });
    });
  });

  // seed database with tasks

  // seed database with task boards
  console.log('Seeded database');
}
const User = require('../models/user');
const Board = require('../models/board');
const bcrypt = require('bcrypt');

function seedUsers(cb) {
  const users = [
    {
      email: 'elliot@gmail.com',
      username: 'elliot',
      password: 'password'
    },
    {
      email: 'darlene@gmail.com',
      username: 'darlene',
      password: 'password'
    },
    {
      email: 'angela@gmail.com',
      username: 'angela',
      password: 'password'
    },
    {
      email: 'will@gmail.com',
      username: 'will',
      password: 'password'
    },
    {
      email: 'mike@gmail.com',
      username: 'mike',
      password: 'password'
    },
    {
      email: 'dustin@gmail.com',
      username: 'dustin',
      password: 'password'
    },
    {
      email: 'lucas@gmail.com',
      username: 'lucas',
      password: 'password'
    },
    {
      email: 'eleven@gmail.com',
      username: 'eleven',
      password: 'password'
    },
  ];

  // seed database with users
  let completed = 0;
  users.forEach(user => {
    const { email, username, password } = user;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      User.create({ username, email, password: hashedPassword }, (err, newUser) => {
        if(err) {
          console.log(err);
          return err;
        };
        completed++;
        if(completed === users.length && cb) {
          cb();
        }
      });
    });
  });
  
  console.log('Seeded users');
}

async function seedBoards() {
  const users = await User.find();

  const boards = [
    {
      owner: users[1]._id,
      members: [
        users[0]._id,
        users[2]._id,
        users[3]._id,
        users[4]._id,
        users[5]._id,
      ],
      label: 'Elliots board',
      columns: [
        {
          name: 'Not started',
        },
        {
          name: 'In progress',
        },
        {
          name: 'Done',
        },
      ],
      tasks: [],
      // tasks: [
      //   {
      //     author: users[1]._id,
      //     title: 'fix computer',
      //     status: 'DONE',
      //   },
      //   {
      //     author: users[3]._id,
      //     title: 'item 1',
      //     status: 'DONE',
      //   },
      //   {
      //     author: users[4]._id,
      //     title: 'item 2',
      //     status: 'DONE',
      //   },
      //   {
      //     author: users[1]._id,
      //     title: 'item 3',
      //     status: 'DONE',
      //   },
      //   {
      //     author: users[1]._id,
      //     title: 'item 4',
      //     status: 'DONE',
      //   },
      //   {
      //     author: users[1]._id,
      //     title: 'item 5',
      //     status: 'DONE',
      //   },
      //   {
      //     author: users[4]._id,
      //     title: 'item 6',
      //     status: 'NOT STARTED',
      //   },
      //   {
      //     author: users[1]._id,
      //     title: 'item 7',
      //     status: 'NOT STARTED',
      //   },
      //   {
      //     author: users[2]._id,
      //     title: 'item 8',
      //     status: 'NOT STARTED',
      //   },
      //   {
      //     author: users[3]._id,
      //     title: 'item 9',
      //     status: 'STARTED',
      //   },
      //   {
      //     author: users[0]._id,
      //     title: 'item 10',
      //     status: 'STARTED',
      //   },
      //   {
      //     author: users[1]._id,
      //     title: 'item 11',
      //     status: 'STARTED',
      //   },
      //   {
      //     author: users[1]._id,
      //     title: 'item 12',
      //     status: 'STARTED',
      //   },
      //   {
      //     author: users[0]._id,
      //     title: 'make food',
      //     status: 'STARTED',
      //   },
      //   {
      //     author: users[1]._id,
      //     title: 'chill',
      //   },
      // ],
    },
    {
      owner: users[3]._id,
      members: [
        users[0]._id,
        users[1]._id,
        users[2]._id,
      ],
      label: 'Wills board',
      columns: [
        {
          name: 'Column 1',
        },
        {
          name: 'Column 2',
        },
      ],
      tasks: [],
      // tasks: [
      //   {
      //     author: users[1]._id,
      //     title: 'sleep',
      //   },
      //   {
      //     author: users[0]._id,
      //     title: 'do dishes',
      //     status: 'DONE',
      //   },
      //   {
      //     author: users[2]._id,
      //     title: 'watch netflix',
      //   },
      // ],
    },
    {
      owner: users[0]._id,
      members: [],
      label: 'Darlenes board',
      columns: [
        {
          name: 'Column 1',
        },
      ],
      tasks: [],
      // tasks: [
      //   {
      //     author: users[0]._id,
      //     title: 'watch youtube',
      //   },
      //   {
      //     author: users[0]._id,
      //     title: 'go to the gym',
      //     status: 'STARTED',
      //   },
      //   {
      //     author: users[0]._id,
      //     title: 'chill',
      //   },
      // ],
    },
    {
      owner: users[2]._id,
      members: [
        users[0]._id,
        users[3]._id,
        users[5]._id,
      ],
      label: 'Angelas board',
      columns: [
        {
          name: 'Not started',
        },
        {
          name: 'In progress',
        },
        {
          name: 'Done',
        },
      ],
      tasks: [],
      // tasks: [
      //   {
      //     author: users[2]._id,
      //     title: 'buy a car',
      //   },
      //   {
      //     author: users[0]._id,
      //     title: 'pick up phone',
      //   },
      //   {
      //     author: users[5]._id,
      //     title: 'buy socks',
      //   },
      // ],
    },
    {
      owner: users[1]._id,
      members: [
        users[0]._id,
        users[3]._id,
        users[4]._id,
      ],
      label: 'Elliots board',
      columns: [],
      tasks: [],
    },
  ];

  boards.forEach(board => {
    const newBoard = new Board(board);

    newBoard.save(err => {
      if(err) {
        console.log(err);
        return err;
      }

      // User.findByIdAndUpdate(board.owner, {
      //   $push: { boards: newBoard._id }
      // }, err => {
      //   if(err) {
      //     console.log(err);
      //     return err;
      //   }
      // });
      User.updateMany({ $or: [
        { _id: board.owner },
        { _id: { $in: board.members } }
      ]}, {
        $push: { boards: newBoard._id }
      }, err => {
        if(err) {
          console.log(err);
          return err;
        }
      });
    });
  });

  console.log('seeded boards and tasks');
}

module.exports = {
  users: seedUsers,
  boards: seedBoards,
}
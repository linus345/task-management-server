const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = require('./task');

const boardSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Board must have an owner'],
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  tasks: [taskSchema],
  label: {
    type: String,
    required: [true, 'Board must have a label'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
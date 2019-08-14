const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Task must have a title'],
  },
  // mainTask: String,
  // subTasks: [String],
}, { timestamps: true });

module.exports = taskSchema;
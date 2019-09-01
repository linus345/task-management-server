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
  // ind: { type: Number, index: true },
  // column: {
  //   type: Schema.Types.ObjectId,
  //   required: [true, 'Task must be in a column'],
  // },
  // status: {
  //   type: String,
  //   enum: ['NOT STARTED', 'STARTED', 'DONE'],
  //   default: 'NOT STARTED',
  // },
}, { timestamps: true });

module.exports = taskSchema;
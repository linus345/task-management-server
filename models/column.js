const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = require('./task');

const columnSchema = new Schema({
  name: { type: String, required: [true, 'Column must have a name'] },
  tasks: { type: [taskSchema], default: [] },
});

module.exports = columnSchema;
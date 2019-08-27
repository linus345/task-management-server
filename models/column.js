const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnSchema = new Schema({
  name: { type: String, required: [true, 'Column must have a name']}
});

module.exports = columnSchema;
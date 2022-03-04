const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
});

const authorModel = model('Author', authorSchema);

module.exports = authorModel;

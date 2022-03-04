const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  authorId: {
    type: String,
    required: true,
    trim: true,
  },
});

const bookModel = model('Book', bookSchema);

module.exports = bookModel;

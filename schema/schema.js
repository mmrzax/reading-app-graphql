const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

// Types
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        async resolve(parent, args) {
          //return _.find(authors, { id: parent.authorId });
          return await Author.findById(parent.authorId);
        },
      },
    }
  },
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        async resolve(parent, args) {
          //return _.filter(books, { authorId: parent.id });
          return await Book.find({ authorId: parent.id });
        },
      },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        //return _.find(books, { id: args.id });
        return await Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return await Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        //return books;
        return Book.find();
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        //return authors;
        return Author.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return await author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString, defaultValue: 'Unknown' },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return await book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

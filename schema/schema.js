const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book.js')
const Author = require('../models/author.js')

const {GraphQLObjectType,
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLInt,
       GraphQLNonNull,
       GraphQLList} = graphql;

//Dummy Data
// var books = [
// {name: 'book1', genre: 'fantasy', id: '1', authorId: '1'},
// {name: 'book2', genre: 'fantasy', id: '2', authorId: '2'},
// {name: 'book3', genre: 'fantasy', id: '3', authorId: '3'},
// {name: 'book4', genre: 'fantasy', id: '4', authorId: '3'},
// {name: 'book5', genre: 'fantasy', id: '5', authorId: '2'},
// {name: 'book6', genre: 'fantasy', id: '6', authorId: '1'}
// ]
//
// var authors = [
// {name: 'author1', age: 55, id: '1'},
// {name: 'author2', age: 44, id: '2'},
// {name: 'author3', age: 22, id: '3'}
// ]

// What is a book
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // return _.find(authors,{id: parent.authorId})
                return Author.findById(parent.authorId);
            }}
    })
})

// What is a Author
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args) {
            // return _.filter(books, {authorId: parent.id,})
            return Book.find({authorId: parent.id});
            }
        }
    })
})

//How can we query a book
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
            console.log(typeof(args.id))
            // return _.find(books, {id: args.id});
            return Book.findById(args.id);

            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
            // return _.find(authors,{id: args.id})
            return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
            // return books
            return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parents, args) {
                // return authors
                return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

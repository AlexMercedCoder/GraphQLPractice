const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLInt} = graphql;

//Dummy Data
var books = [
{name: 'book1', genre: 'fantasy', id: '1', authorId: '1'},
{name: 'book2', genre: 'fantasy', id: '2', authorId: '2'},
{name: 'book3', genre: 'fantasy', id: '3', authorId: '3'}
]

var authors = [
{name: 'author1', age: 55, id: '1'},
{name: 'author2', age: 44, id: '2'},
{name: 'author3', age: 22, id: '3'}
]

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
                return _.find(authors,{id: parent.authorId})
            }}
    })
})

// What is a Author
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
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
            return _.find(books, {id: args.id});


            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
            return _.find(authors,{id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

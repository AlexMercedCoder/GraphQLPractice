const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// What is a book
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

//How can we query a book
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){

                //code to get info from DB
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

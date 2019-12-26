const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
require('dotenv').config();
const mongoose = require('mongoose');
const dbupdateobject = { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false , useCreateIndex: true};
const cors = require('cors');

mongoose.connect(process.env.CLUSTER, dbupdateobject);
mongoose.connection.once('open', () => {console.log('connected to database')})



app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {console.log('Listening for Requests')})

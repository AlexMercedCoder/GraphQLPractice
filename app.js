const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');


app.use('/graphql', graphqlHTTP({}));


app.listen(4000, () => {console.log('Listening for Requests')})

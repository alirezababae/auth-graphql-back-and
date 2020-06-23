const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req,res , next)=>{

  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methos', 'GET , POST , OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');

  if(req.method === 'OPTIONS'){

    return res.sendStatus(200);

  }
next()
})

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect('mongodb://localhost:27017/hapi',{
useCreateIndex:true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(doc => {

console.log('connect');


})

.catch(docc => {

console.log('no connect');


})
app.listen(3001 ,() => {

console.log('run server');

})

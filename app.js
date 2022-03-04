const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const { connection } = require('mongoose');
const cors = require('cors');
require('./db/connect');

const app = express();
const port = process.env.PORT || 3001;

// allow cross-origin requests
app.use(cors());

connection.once('open', () => {
  console.log('CONNECTED TO DB');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`SERVER IS UP ON PORT ${port}`);
});

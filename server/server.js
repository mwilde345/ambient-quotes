const path = require("path");
const fs = require("fs");
const { resolvers } = require("./resolvers");

var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var cors = require("cors");
const { makeExecutableSchema } = require("graphql-tools");

const schemaFile = path.join(__dirname, "schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");

// Construct a schema, using GraphQL schema language
const schema = makeExecutableSchema({ typeDefs, resolvers });

var app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// const dbClient =
app.use(cors(corsOptions));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: {},
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

const { Database } = require("./data/database");

var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var cors = require("cors");

const Projects = new Database("projects");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Project {
    sources: [String]
  }
  type Query {
    project(id: String!): Project
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  project: ({ id }) => {
    return Projects.get(id);
  },
};

var app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

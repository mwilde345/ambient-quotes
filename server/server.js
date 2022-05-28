const path = require("path");
const fs = require("fs");
const { Database } = require("./data/database");

var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var cors = require("cors");
const { makeExecutableSchema } = require("graphql-tools");

const schemaFile = path.join(__dirname, "schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");

const Projects = new Database("projects");
const Sources = new Database("sources");
const Medias = new Database("medias");
const Quotes = new Database("quotes");

// The root provides a resolver function for each API endpoint
var resolvers = {
  Query: {
    project: (obj, args, context, info) => {
      return Projects.get(args.id);
    },
  },
  Project: {
    // sources(obj, args, context, info) {
    //   console.log(args);
    //   return Sources.get("source-1");
    // },
    sources: (project) => project.sources,
  },
  Source: {
    quotes: () => ["quote"],
    medias: () => ["media"],
  },
  Media: {
    type: () => "video",
    link: () => "link here",
    name: () => "sup",
  },
  Quote: {
    start: () => 0,
    end: () => 5,
  },
};

// Construct a schema, using GraphQL schema language
const schema = makeExecutableSchema({ typeDefs, resolvers });

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
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

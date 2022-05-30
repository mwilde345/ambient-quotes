const { Database } = require("./data/database");
const { scrape } = require("./scraper");

const Projects = new Database("projects");
const Sources = new Database("sources");
const Medias = new Database("medias");
const Quotes = new Database("quotes");

module.exports = {
  resolvers: {
    Query: {
      project: (obj, args, context, info) => {
        return Projects.get(args.id);
      },
      test: () => {
        // scrape();
        return "nothin";
      },
    },
    Project: {
      // sources(obj, args, context, info) {
      //   console.log(args);
      //   return Sources.get("source-1");
      // },
      sources: (project) =>
        project.sources.map((sourceID) => Sources.get(sourceID)),
    },
    Source: {
      quotes: (source) => {
        return source.quotes.map((quoteID) => Quotes.get(quoteID));
      },
      medias: (source) => {
        return source.medias.map((mediaID) => Medias.get(mediaID));
      },
    },

    // Media: {
    //   type: () => "video",
    //   link: () => "link here",
    //   name: () => "sup",
    // },
    // Quote: {
    //   start: () => 0,
    //   end: () => 5,
    // },
  },
};

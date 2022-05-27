const fs = require("fs");

const Projects = require("./projects.json");
const Sources = require("./sources.json");
const Medias = require("./medias.json");
const Quotes = require("./quotes.json");

class Database {
  constructor(source) {
    this.source = source;
    this.datasource = {
      projects: Projects,
      sources: Sources,
      medias: Medias,
      quotes: Quotes,
    }[this.source];
  }

  list = function () {
    return this.datasource;
  };

  get = function (id) {
    return this.datasource[id];
  };

  put = function (id, data) {
    this.datasource[id] = data;
    fs.writeFileSync(`./${this.source}.json`, this.datasource);
  };

  delete = function (id) {
    delete this.datasource[id];
    fs.writeFileSync(`./${this.source}.json`, this.datasource);
  };
}

module.exports = {
  Database,
};

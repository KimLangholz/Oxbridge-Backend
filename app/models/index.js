const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || dbConfig.url, connectionOptions);
mongoose.Promise = global.Promise;

const db = {};

console.log("dbConfig: "+dbConfig.url);

db.mongoose = mongoose;
db.url = dbConfig.url;
db.raceLogs = require("./race_log.model.js")(mongoose);
db.admins = require("./admin.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.races = require("./race.model.js")(mongoose);
db.teams = require("./team.model.js")(mongoose);
db.results = require("./race_result.model.js")(mongoose);

module.exports = db;
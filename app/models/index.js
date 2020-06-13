const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

console.log("dbConfig: "+dbConfig.url);

db.mongoose = mongoose;
db.url = dbConfig.url;
db.raceLogs = require("./raceLogModel.js")(mongoose);
db.admins = require("./adminModel.js")(mongoose);
db.users = require("./userModel.js")(mongoose);
db.races = require("./raceModel.js")(mongoose);
db.teams = require("./teamModel.js")(mongoose);
db.results = require("./raceResultModel.js")(mongoose);

module.exports = db;
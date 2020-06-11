const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

const db = {};

//console.log("dbConfig: "+config.connectionString);

db.mongoose = mongoose;
db.url = config.connectionString;
db.raceLogs = require("../app/models/race_log.model.js")(mongoose);
db.admins = require("../app/models/admin.model.js")(mongoose);
db.users = require("../app/models/user.model.js")(mongoose);
db.races = require("../app/models/race.model.js")(mongoose);
db.teams = require("../app/models/team.model.js")(mongoose);
db.results = require("../app/models/race_result.model.js")(mongoose);

module.exports = db;
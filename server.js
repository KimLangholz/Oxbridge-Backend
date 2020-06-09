require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
require('dotenv').config();

/*
// Environment specific settings
if (process.env.NODE_ENV === 'production') {
    port = process.env.PORT;
    app.use(cors());
} else {
    var corsOptions = {
        origin: "http://localhost:8080"
    };
    app.use(cors(corsOptions));
}
*/

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = require("./app/models");

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.log("Cannot connect to database!", err);
        process.exit();
    });

//Routes
app.get('/', (req, res) => {
    res.send('Oxbridge API');
})
require("./app/routes/race_log.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/race.routes")(app);
require("./app/routes/team.routes")(app);
require("./app/routes/race_result.routes")(app);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
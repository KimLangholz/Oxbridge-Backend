require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = require("./app/models");

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.get('/', (req, res) => {
    res.send('Oxbridge API');
})
require("./app/routes/race_log.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/race.routes")(app);
require("./app/routes/team.routes")(app);
require("./app/routes/race_result.routes")(app);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

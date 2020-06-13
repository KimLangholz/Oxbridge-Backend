const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

//Connect server - local & cloud
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

//Connect to DB local & cloud
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


//Print something on home screen
app.get('/', (req, res) => {
    res.send('Oxbridge Project - API');
})

require("./app/routes/raceLogRoutes")(app);
require("./app/routes/adminRoutes")(app);
require("./app/routes/userRoutes")(app);
require("./app/routes/teamRoutes")(app);
require("./app/routes//raceRoutes")(app);
require("./app/routes/raceResultRoutes")(app);

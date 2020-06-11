const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");



//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const db = require("./app/models");

//Connect server - local & cloud
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


//Connect to DB
const db = require("./app/models");
/*
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
    */

if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://oxbridge:Oxbridge6400@ds147030.mlab.com:47030/heroku_34px2w6n', () => 
    console.log('Connected to cloud dB!')
    )}
else {
    mongoose.connect('mongodb://oxbridge:Oxbridge6400@ds147030.mlab.com:47030/heroku_34px2w6n', () => 
    console.log('Connected to local dB!')
    )};



app.get('/', (req, res) => {
        res.send('Oxbridge API');
    })
/*
    require("./app/routes/race_log.routes")(app);
    require("./app/routes/admin.routes")(app);
    require("./app/routes/user.routes")(app);
    require("./app/routes/race.routes")(app);
    require("./app/routes/team.routes")(app);
    require("./app/routes/race_result.routes")(app);
   */ 
/*
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

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

app.listen(port, () => {
    console.log('Server is running on port:' + port);
});*/
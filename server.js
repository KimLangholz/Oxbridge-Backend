const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var port = 8080;
require('dotenv').config();

// Environment specific settings
if (process.env.NODE_ENV === 'production') {
    port = process.env.PORT;
    app.use(cors());
} else {
    var corsOptions = {
        origin: "http://localhost:8081"
    };
    app.use(cors(corsOptions));
}

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
});
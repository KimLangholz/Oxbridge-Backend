const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
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

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created ...',
                authData
            });
        }
    });
    
});


app.post('/api/login', (req, res) => {
    
    // Mock user
    const user = {
        id: 1,
        username: 'Wisam',
        email: 'swaiidan@eatmore.dk'
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        });
    });
});

// Format of token
// Authorization: Bearer <access_token>

// Verify token
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Chech if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' '); //turns a string to a array and seprate
        //Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Call the next middelware
        next();
    }else {
        //Forbidden
        res.sendStatus(403);
    }
} 

//app.listen(5000, () => console.log('Server started on port 5000'));

require("./app/routes/raceLogRoutes")(app);
require("./app/routes/adminRoutes")(app);
require("./app/routes/userRoutes")(app);
require("./app/routes/teamRoutes")(app);
require("./app/routes//raceRoutes")(app);
require("./app/routes/raceResultRoutes")(app);

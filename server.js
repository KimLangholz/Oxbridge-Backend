const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Import routes
const postsRoute = require('./app/routes/posts');
app.use('/api/user', postsRoute);

//Connect server - local & cloud
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

//Connect to DB local & cloud
if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://oxbridge:Oxbridge6400@ds147030.mlab.com:47030/heroku_34px2w6n', () => 
    console.log('Connected to cloud dB!')
    )}
else {
    mongoose.connect('mongodb://oxbridge:Oxbridge6400@ds147030.mlab.com:47030/heroku_34px2w6n', () => 
    console.log('Connected to local dB!')
)};

//Print something on home screen
app.get('/', (req, res) => {
    res.send('Oxbridge Project - API');
})


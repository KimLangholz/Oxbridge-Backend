// Our Database Configuration file. It holds the db-connection string 
// which varies depending on the environment.

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        url: process.env.DB_CONNECTION
    };
}
else {
    module.exports = {
        url: "mongodb://localhost:27017/Oxbridge"
    };
}
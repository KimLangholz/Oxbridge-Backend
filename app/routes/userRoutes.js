module.exports = app => {
    
    const user = require("../controllers/userController.js");

    var router = require("express").Router();

    router.post('/', user.create);

    router.get('/verify/:email/:password', user.verify);

    app.use('/api/user', router);
};
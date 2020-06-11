module.exports = app => {
    
    const admin = require("../controllers/admin.controller.js");

    var router = require("express").Router();

    router.post('/', admin.create);

    router.get('/verify/:email/:password', admin.verify);

    app.use('/api/admin', router);
};
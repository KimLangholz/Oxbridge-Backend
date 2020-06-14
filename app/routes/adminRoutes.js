module.exports = app => {
    
    const admin = require("../controllers/adminController.js");

    var router = require("express").Router();

    router.post('/', admin.create);

    router.get('/', admin.findAll);

    router.get('/verify/:email/:password', admin.verify);

    app.use('/api/admin', router);
};
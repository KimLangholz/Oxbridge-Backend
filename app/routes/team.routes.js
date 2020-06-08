module.exports = app => {
    const team = require("../controllers/team.controller.js");

    var router = require('express').Router();

    router.post('/', team.newTeam);

    router.get('/search/:searchQuery', team.search);

    router.get('/', team.findAll);

    router.put('/:id', team.update);

    router.delete('/:id', team.delete);

    app.use('/api/team', router);
};
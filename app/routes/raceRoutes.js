module.exports = app => {
    const race = require("../controllers/raceController.js");

    var router = require('express').Router();

    router.post('/', race.newRace);

    router.get('/search/:searchQuery', race.search);

    router.put('/:id', race.update);

    router.delete('/:id', race.delete);

    app.use('/api/race', router);
};
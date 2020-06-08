module.exports = app => {
    const raceResult = require("../controllers/race_result.controller.js");

    var router = require('express').Router();

    router.post('/', raceResult.newResult);

    router.get('/', raceResult.findAll);

    router.get('/specific/:raceId?:teamId?', raceResult.teamOrRace);

    router.put('/:id', raceResult.update);

    router.delete('/:id', raceResult.delete);

    app.use('/api/result', router);
};
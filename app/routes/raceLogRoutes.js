module.exports = app => {
    const raceLogs = require("../controllers/raceLogController.js");

    var router = require('express').Router();

    router.post('/', raceLogs.create);

    router.get('/', raceLogs.findAll);

    router.get('/specific/:raceId?:teamId?', raceLogs.findSpecific);

    router.get('/:id', raceLogs.findOne);

    router.put('/:id', raceLogs.update);

    router.delete('/:id', raceLogs.delete);

    // Not activated at this point.
    //router.delete("/", raceLogs.deleteAll);

    app.use('/api/log', router);
};
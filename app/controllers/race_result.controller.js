const db = require("../models");
const raceResultModel = db.results;

/**
 * Create and Save a new RaceResult.
 */
exports.newResult = (req, res) => {

    // Validate request
    if (!req.body.raceId || !req.body.teamId || !req.body.result || !req.body.startTime || !req.body.finishTime) {
        res.status(400).send({ message: 'Please provide all required data!' });
        return;
    }

    //Create RaceResult entry
    const raceResult = new raceResultModel({
        raceId: req.body.raceId,
        teamId: req.body.teamId,
        result: req.body.result,
        startTime: req.body.startTime,
        finishTime: req.body.finishTime,
    });

    // Save entry to the Database.
    raceResult
        .save(raceResult)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while creating this RaceResult."
            });
        });
};

/**
 * Retrieve results from a specific race
 */
exports.teamOrRace = (req, res) => {

    const raceId = req.query.raceId;
    const teamId = req.query.teamId;

    if (!raceId && !teamId) {
        res.status(400).send({ message: "We need either a raceId, teamId or both! " });
        return;
    } else if (!raceId) {
        raceResultModel.find({ teamId: teamId })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "An error occurred while retrieving RaceResults."
                });
            });
    } else if (!teamId) {
        raceResultModel.find({ raceId: raceId })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "An error occurred while retrieving RaceResults."
                });
            });
    } else {
        raceResultModel.find({ teamId: teamId, raceId: raceId })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "An error occurred while retrieving RaceResults."
                });
            });
    }
};

/**
 * Retrieve all Results from the database.
 */
exports.findAll = (req, res) => {

    raceResultModel.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving all Results."
            });
        });
};

/**
 * Update a Race based on the ID in the request.
 */
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "More data is needed!"
        });
    }

    const id = req.params.id;

    raceResultModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update RaceResult with id=${id}.`
                });
            } else res.send({ message: "RaceResult was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating the RaceResult with id = " + id
            });
        });
};

/**
 * Delete a Race based on the ID in the request.
 */
exports.delete = (req, res) => {
    const id = req.params.id;

    raceResultModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete RaceResult with id=${id}.`
                });
            } else {
                res.send({
                    message: "RaceResult was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete the RaceResult with id = " + id
            });
        });
};
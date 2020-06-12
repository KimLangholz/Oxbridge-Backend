const db = require("../models");
const RaceLog = db.raceLogs;

/**
 * Create and Save a new Racelog entry.
 */
exports.create = (req, res) => {

    // Validate request
    if (!req.body.raceId || !req.body.teamId || !req.body.position) {
        res.status(400).send({ message: "Content cannot be empty! " });
        return;
    }

    //Create RaceLog entry
    const raceLog = new RaceLog({
        raceId: req.body.raceId,
        teamId: req.body.teamId,
        position: req.body.position,
    });

    // Save entry to the Database.
    raceLog
        .save(raceLog)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while creating this RaceLog entry."
            });
        });
};

/**
 * Retrieve all RaceLog entries from the database.
 */
exports.findAll = (req, res) => {

    RaceLog.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving RaceLog Entries."
            });
        });
};

/**
 * Retrieve all logs belonging to a team, a race or a team in a race based on either a raceId, teamId or both.
 */
exports.findSpecific = (req, res) => {
    const raceId = req.query.raceId;
    const teamId = req.query.teamId;

    if (!raceId && !teamId) {
        res.status(400).send({ message: "We need either a raceId, teamId or both! " });
        return;
    } else if (!raceId) {
        RaceLog.find({ teamId: teamId })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving RaceLog Entries."
                });
            });
    } else if (!teamId) {
        RaceLog.find({ raceId: raceId })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving RaceLog Entries."
                });
            });
    } else {
        RaceLog.find({ teamId: teamId, raceId: raceId })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving RaceLog Entries."
                });
            });
    }
};

/**
 * Find a single RaceLog Entry based on the _ID in the request.
 */
exports.findOne = (req, res) => {
    const id = req.params.id;

    RaceLog.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Didn't find any RaceLog entry with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving RaceLog Entry with id=" + id });
        });
};

/**
 * Update a RaceLog entry based on the ID in the request.
 */
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    RaceLog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update RaceLog entry with id=${id}. Maybe RaceLog was not found!`
                });
            } else res.send({ message: "RaceLog entry was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Racelog entry with id = " + id
            });
        });
};

/**
 * Delete a RaceLog entry based on the ID in the request.
 */
exports.delete = (req, res) => {
    const id = req.params.id;

    RaceLog.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete RaceLog entry with id=${id}. Maybe RaceLog entry wasn't' found!`
                });
            } else {
                res.send({
                    message: "RaceLog entry was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete RaceLog entry with id = " + id
            });
        });
};

/**
 * Delete all RaceLog entries in the database.
 */
exports.deleteAll = (req, res) => {
    RaceLog.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} RaceLog entry was deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all RaceLog entry."
            });
        });
};
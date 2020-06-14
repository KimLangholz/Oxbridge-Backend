const db = require("../models");
const raceModel = db.races;

/**
 * Create and Save a new Race.
 */
exports.newRace = (req, res) => {

    // Validate request
    if (!req.body.raceTitle || !req.body.street || !req.body.city || !req.body.zipcode || !req.body.country || !req.body.course || !req.body.maxTeams || !req.body.startTime) {
        res.status(400).send({ message: 'Please provide all required data!' });
        return;
    }

    //Create RaceLog entry
    const race = new raceModel({
        raceTitle: req.body.raceTitle,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        country: req.body.country,
        course: req.body.course,
        maxTeams: req.body.maxTeams,
        startTime: req.body.startTime,
        finishTime: req.body.finishTime,
    });

    // Save entry to the Database.
    race
        .save(race)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while creating this Race."
            });
        });
};

/**
 * Retrieve all Races from the database.
 */
exports.findAll = (req, res) => {

    raceModel.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving all Races."
            });
        });
};

/**
 * Retrieve a specific race.
 */
exports.search = (req, res) => {

    // Add a HTTP response test, so that if data is empty or there is an error, it should default to show all.
    raceModel.find({ $text: { $search: req.params.searchQuery } })
        .then(data => {
            console.log(req.query.searchQuery);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving RaceLog Entries."
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

    raceModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Race with id=${id}.`
                });
            } else res.send({ message: "Race was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating the Race with id = " + id
            });
        });
};

/**
 * Delete a Race based on the ID in the request.
 */
exports.delete = (req, res) => {
    const id = req.params.id;

    raceModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Race with id=${id}.`
                });
            } else {
                res.send({
                    message: "Race was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete the Race with id = " + id
            });
        });
};

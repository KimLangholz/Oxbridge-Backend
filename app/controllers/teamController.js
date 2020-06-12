const db = require("../models");
const teamModel = db.teams;

/**
 * Create and Save a new Team.
 */
exports.newTeam = (req, res) => {

    // Validate request
    if (!req.body.teamName || !req.body.boatName) {
        res.status(400).send({ message: 'Please provide all required data!' });
        return;
    }

    //Create Team
    const team = new teamModel({
        teamName: req.body.teamName,
        boatName: req.body.boatName,
        teamMembers: req.body.teamMembers,
    });

    // Save entry to the Database.
    team
        .save(team)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while creating this Team."
            });
        });
};

/**
 * Retrieve a specific team.
 */
exports.search = (req, res) => {

    // Add a HTTP response test, so that if data is empty or there is an error, it should default to show all.
    teamModel.find({ $text: { $search: req.params.searchQuery } })
        .then(data => {
            console.log(req.query.searchQuery);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving Team Entries."
            });
        });


};

/**
 * Retrieve all Teams from the database.
 */
exports.findAll = (req, res) => {

    teamModel.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving all Teams."
            });
        });
};

/**
 * Update a Team based on the ID in the request.
 */
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "More data is needed!"
        });
    }

    const id = req.params.id;

    teamModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Team with id=${id}.`
                });
            } else res.send({ message: "Team was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating the Team with id = " + id
            });
        });
};

/**
 * Delete a Race based on the ID in the request.
 */
exports.delete = (req, res) => {
    const id = req.params.id;

    teamModel.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tema with id=${id}.`
                });
            } else {
                res.send({
                    message: "Team was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete the Team with id = " + id
            });
        });
};
const db = require("../models");
const userModel = db.users;
const bcrypt = require('bcrypt-nodejs');

/**
 * Create and Save a new User.
 */
exports.create = (req, res) => {

    // Validate request
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        res.status(400).send({ message: "Email, password, firstname and lastname all needs to be filled out!" });
        return;
    }

    //Create new User
    const user = new userModel({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    // Save Admin to the Database.
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while creating this new User."
            });
        });
};

/**
 * Find and verify a User based on the email and password in the request.
 * Will first try to find a user based on the email, then secondly compare passwords.
 */
exports.verify = (req, res) => {

    userModel.findOne({ email: req.params.email })
        .then(data => {
            console.log(data.password);
            if (!data)
                res.status(404).send({ message: "This email doesn\'t excist in our Database." });
            else {
                bcrypt.compare(req.params.password, data.password, function (err, feedback) {
                    console.log('Password: ' + req.params.password, 'compare to: ' + data.password);
                    if (err) {
                        throw err;
                    }
                    if (feedback) {
                        return res.send(data);
                    } else {
                        return res.send('Password didn\'t match email');
                    }
                });
            }
        })
        .catch(error => {
            res
                .status(500)
                .send({ message: 'Unknown error occured:' + error });
        });

};
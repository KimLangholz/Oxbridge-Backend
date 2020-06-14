const db = require("../models");
const adminModel = db.admins;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config');

generateToken = admin => {
    return jwt.sign({
        iss: 'OxbridgeDK',
        sub: admin.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)},
        jwt_secret);
}

/**
 * Create and Save a new Admin.
 */
exports.create = (req, res) => {

    // Validate request
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: "Email and/or Password cannot be empty!" });
        return;
    }

    //Create new Admin
    const admin = new adminModel({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });

    // Save Admin to the Database.
    admin
        .save(admin)
        .then(data => {
            // const token = generateToken(admin);
            // res.status(200).json({token});
            res.send(data);            
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while creating this new Admin."
            });
        });
};


/**
 * Find and verify an Admin based on the email and password in the request.
 * Will first try to find a user based on the email, then first compare passwords.
 */
exports.verify = (req, res) => {

    const admin = adminModel.findOne({ email: req.params.email })
        .then(data => {
            console.log(data.password);
            if (!data)
                res.status(404).send({ message: "This email doesn\'t exist in our Database." });
            else {
                bcrypt.compare(req.params.password, data.password, function (err, feedback) {
                    console.log('Password: ' + req.params.password, 'compare to: ' + data.password);
                    if (err) {
                        throw err;
                    }
                    if (feedback) {
                        return res.send(data);
                        // working token - need to send data too
                        /* const token = generateToken(admin);
                        return res.json({
                            token
                        });*/

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

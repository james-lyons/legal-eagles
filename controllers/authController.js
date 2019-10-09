const bcrypt = require('bcryptjs');
const validateClient = require('../validation/registerClient');
const validateAttorny = require('../validation/registerAttorney');
const db = require('../models');

const registerAttorney = (req, res) => {
    const { errors, notValid } = validate(req.body);

    if (notValid) {
        return res.status(400).json({ status: 400, errors });
    };

    db.Attorny.findOne({ email: req.body.email }), (err, foundAttorny) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        if (foundAttorny) return res.status(400).json({
            status: 400,
            message: 'This email has already been registered.'
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: 'Something went wrong, please try again.'
                });

                const newAttorny = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    password2: hash,
                    address: req.body.address,
                    zipCode: req.body.zipCode,
                    specialties: req.body.specialties
                };

                db.Attorny.create(newAttorny, (err, savedAttorny) => {
                    if (err) return res.status(500).json({
                        status: 500,
                        message: err
                    });

                    res.status(201).json({
                        status: 201,
                        message: 'Successfully created new attorny account.'
                    });
                });
            });
        });
    };
};

const registerClient = (req, res) => {
    const { errors, notValid } = validate(req.body);

    if (notValid) {
        return res.status(400).json({ status: 400, errors });
    };

    db.Client.findOne({ email: req.body.email }, (err, foundClient) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        if (foundClient) return res.status(400).json({
            status: 400,
            message: 'Something went wrong, please try again.'
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: 'Something went wrong, please try again.'
                });

                const newClient = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    password2: hash
                };

                db.Client.create(newClient, (err, savedClient) => {
                    if (err) return res.status(500).json({
                        status: 500,
                        message: err
                    });

                    res.status(201).json({
                        status: 201,
                        message: 'Successfully created new client account.'
                    });
                });
            });
        });
    });
};

const attornyLogin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: 'Please enter your email and password'
        });
    };

    db.Attorny.findOne({ email: req.body.email }, (err, foundAttorny) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        if (!foundUser) return res.status(400).json({
            status: 400,
            message: 'Email or password is incorrect'
        });

        bcrypt.compare(req.body.password, foundAttorny.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            if (isMatch) {
                req.session.loggedIn = true;
                req.session.currentUser = { id: foundAttorny._id };
                return res.status(200).json({
                    status: 200,
                    message: 'Successfully logged in', id: foundAttorny._id
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Username or password is incorrect'
                });
            };
        });
    });
};

const clientLogin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: 'Please enter your email and password'
        });
    };

    db.Client.findOne({ email: req.body.email }, (err, foundClient) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        if (!foundUser) return res.status(400).json({
            status: 400,
            message: 'Email or password is incorrect'
        });

        bcrypt.compare(req.body.password, foundClient.passwprd, (err, isMatch) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            if (isMatch) {
                req.session.loggedIn = true;
                req.session.currentUser = { id: foundClient._id };
                return res.status(200).json({
                    status: 200,
                    message: 'Successfully logged in', id: foundClient._id
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Username or password is incorrect'
                });
            };
        });
    });
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });
        res.sendStatus(200);
    });
};

module.exports = {
    registerAttorney,
    registerClient,
    attornyLogin,
    clientLogin,
    logout
}
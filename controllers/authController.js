const bcrypt = require('bcryptjs');
const validateClient = require('../validation/registerClient');
const validateAttorney = require('../validation/registerAttorney');
const db = require('../models');

const registerAttorney = (req, res) => {
    const { errors, notValid } = validateAttorney(req.body);

    if (notValid) {
        return res.status(400).json({ status: 400, errors });
    };

    db.Attorney.findOne({ email: req.body.email }, (err, foundAttorney) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        if (foundAttorney) return res.status(400).json({
            status: 400,
            message: 'This email has already been registered.'
        });

        db.Client.findOne({ email: req.body.email }, (err, foundClient) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            if (foundClient) return res.status(400).json({
                status: 400,
                message: 'This email has already been registered'
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
    
                    const newAttorney = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        password2: hash,
                        zipcode: req.body.zipcode,
                        specialties: req.body.specialties
                    };
    
                    db.Attorney.create(newAttorney, (err, savedAttorney) => {
                        if (err) return res.status(500).json({
                            status: 500,
                            message: err
                        });
    
                        res.status(201).json({
                            status: 201,
                            message: 'Successfully registered new attorney.'
                        });
                    });
                });
            });
        });
    });
};

const registerClient = (req, res) => {
    const { errors, notValid } = validateClient(req.body);

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

        db.Attorney.findOne({ email: req.body.email}, (err, foundAttorney) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            if (foundAttorney) return res.status(400).json({
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
                            message: 'Successfully registered new client.'
                        });
                    });
                });
            });
        });
    });
};

const attorneyLogin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: 'Please enter your email and password'
        });
    };

    db.Attorney.findOne({ email: req.body.email }, (err, foundAttorney) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        if (!foundAttorney) return res.status(400).json({
            status: 400,
            message: 'Email or password is incorrect'
        });

        bcrypt.compare(req.body.password, foundAttorney.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            if (isMatch) {
                req.session.loggedIn = true;
                req.session.currentUser = { id: foundAttorney._id, user_type: foundAttorney.user_type };
                return res.status(200).json({
                    status: 200,
                    message: 'Successfully logged in', id: foundAttorney._id
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

        if (!foundClient) return res.status(400).json({
            status: 400,
            message: 'Email or password is incorrect'
        });

        bcrypt.compare(req.body.password, foundClient.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            if (isMatch) {
                req.session.loggedIn = true;
                req.session.currentUser = { id: foundClient._id, user_type: foundClient.user_type };
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
    attorneyLogin,
    clientLogin,
    logout
}
const db = require('../models');

const showClient = (req, res) => {
    db.Client.findById(req.params.id, (err, foundClient) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            data: foundClient
        });
    });
};

const editAccount = (req, res) => {
    db.Client.findByIdAndUpdate(req.session.currentUser.id, req.body, (err, foundClient) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(202).json({
            status: 202,
            data: foundClient
        });
    });
};

const deleteAccount = (req, res) => {
    db.Client.findByIdAndDelete(req.session.currentUser.id, (err, foundClient) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Account successfully deleted'
        });
    });
};

module.exports = { 
    showClient,
    editAccount,
    deleteAccount
}
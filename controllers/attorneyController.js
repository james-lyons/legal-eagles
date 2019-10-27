const db = require('../models');

const indexAttorneys = (req, res) => {
    db.Attorney.find({
        $or: [{ specialty: req.query.specialty }, { zipcode: req.query.zipcode }]},
        (err, foundAttorneys) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });
            res.status(200).json({
                status: 200,
                data: foundAttorneys
            });
        })
        .populate('reviews');
};

const showAttorneyById = (req, res) => {
    db.Attorney.findById(req.params.id, (err, foundAttorney) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            data: foundAttorney
        });
    })
    .populate('reviews');
};

const showAttorneyByURL = (req, res) => {
    db.Attorney.findOne({url: req.params.url}, (err, foundAttorney) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            data: foundAttorney
        });
    })
    .populate('reviews');
};

const editAccount = (req, res) => {
    db.Attorney.findByIdAndUpdate(req.session.currentUser.id, req.body, (err, foundAttorney) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(202).json({
            status: 202,
            data: foundAttorney
        });
    });
};

const deleteAccount = (req, res) => {
    db.Attorney.findByIdAndDelete(req.session.currentUser.id, (err, foundAttorney) => {
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
    indexAttorneys,
    showAttorneyById,
    showAttorneyByURL,
    editAccount,
    deleteAccount
}
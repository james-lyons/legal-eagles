const db = require('../models');

const indexAttorneys = (req, res) => {
    console.log(req.query)
    db.Attorney.find({
        $or: [{ specialty: req.query.specialty }, { zipcode: req.query.zipcode }]},
        (err, foundAttorneys) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });
            console.log(foundAttorneys)
            res.status(200).json({
                status: 200,
                data: foundAttorneys
            });
        });
};

const indexAttorneysBySpecialty = (req, res) => {
    console.log(req.params)
    db.Attorney.find({ specialty: req.params.specialty }, (err, foundAttorneys) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });
        console.log(foundAttorneys)
        res.status(200).json({
            status: 200,
            data: foundAttorneys
        });
    });
};

const indexAttorneysByZipcode = (req, res) => {
    console.log(req.params)
    db.Attorney.find({ zipcode: req.params.zipcode }, (err, foundAttorneys) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });
        console.log(foundAttorneys)
        res.status(200).json({
            status: 200,
            data: foundAttorneys
        });
    });
};


const showAttorney = (req, res) => {
    db.Attorney.findById(req.params.id, (err, foundAttorney) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            data: foundAttorney
        });
    });
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
    indexAttorneysBySpecialty,
    indexAttorneysByZipcode,
    showAttorney,
    editAccount,
    deleteAccount
}
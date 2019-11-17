const db = require('../models');

const indexReviews = (req, res) => {
    db.Review.find({}, (err, foundReviews) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            data: foundReviews
        });
    });
};

const createReview = (req, res) => {
    const review =
        {
            author: req.session.currentUser.id,
            author_name: req.session.currentUser.name,
            review_text: req.body.review_text
        }

    if (!req.session.currentUser.name) return res.status(401).json({
        status: 401,
        message: 'Must be logged in as a client to write reviews.'
    })

    db.Review.create(review, (err, createdReview) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        db.Attorney.findById(req.body.attorney_id, (err, foundAttorney) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            foundAttorney.reviews.push(createdReview._id);
            foundAttorney.save();
        });

        db.Client.findById(req.session.currentUser.id, (err, foundClient) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.'
            });

            foundClient.reviews.push(createdReview._id);
            foundClient.save();
        });

        res.status(201).json({
            status: 201,
            data: createdReview
        });
    });
};

const editReview = (req, res) => {
    db.Review.findByIdAndUpdate(req.params.id, req.body, (err, editedReview) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again. 4'
        });

        res.status(202).json({
            status: 202,
            data: editedReview
        });
    });
};

const deleteReview = (req, res) => {
    db.Review.findByIdAndDelete(req.params.id, (err, deletedReview) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            data: deletedReview
        });
    });
};

module.exports = {
    indexReviews,
    createReview,
    editReview,
    deleteReview
}
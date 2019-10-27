const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    author_name: {
        type: String,
        required: true
    },
    attorney: {
        type: Schema.Types.ObjectId,
        ref: 'Attorney'
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
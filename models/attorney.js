const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attorneySchema = new Schema({
    user_type: {
        type: String,
        default: 'attorney',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email has already been registered."]
    },
    url: {
        type: String,
        required: true,
        unique: [true, "url has already been registered."]
    },
    bio: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: true,
        default: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg'
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: Number,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    password: {
        type: String,
        required: true,
    },
});

const Attorney = mongoose.model('Attorney', attorneySchema);
module.exports = Attorney;
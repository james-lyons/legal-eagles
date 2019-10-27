const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    user_type: {
        type: String,
        default: 'client',
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
    password: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
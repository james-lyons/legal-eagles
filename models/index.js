const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/legal_eagles';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB hasconnected successfully.'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    Attorney: require('./attorney'),
    Client: require('./client'),
    Review: require('./review')
};
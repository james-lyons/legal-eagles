module.exports = ({ review_text }) => {
    let errors = [];

    if (!review_text) {
        errors.push({ message: 'Please write a review' });
    };

    return {
        errors,
        notValid: Boolean(errors.length)
    };
};
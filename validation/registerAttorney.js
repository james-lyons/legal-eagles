module.exports = ({ first_name, last_name, email, profile_image, city, state, zipcode, specialty, password, password2 }) => {
    let errors = [];

    if (!first_name) {
        errors.push({ message: 'Please enter your first name' });
    };

    if (!last_name) {
        errors.push({ message: 'Please enter your last name' });
    };

    if (!email) {
        errors.push({ message: 'Please enter your email' });
    };

    if (!profile_image) {
        errors.push({ message: 'Please enter your profile image' });
    };

    if (!city) {
        errors.push({ message: 'Please enter your city' });
    };

    if (!state) {
        errors.push({ message: 'Please select your state' });
    };

    if (!zipcode) {
        errors.push({ message: 'Please enter your zipcode' });
    };

    if (!specialty) {
        errors.push({ message: 'Please select your specialty' });
    };

    if (!password) {
        errors.push({ message: 'Please enter your password' });
    };

    if (!password2) {
        errors.push({ message: 'Please enter your password' });
    };

    if (password !== password2) {
        errors.push({ message: 'Passwords must match' });
    };

    return {
        errors,
        notValid: Boolean(errors.length)
    };
};
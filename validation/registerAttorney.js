module.exports = ({ name, email, password, password2, address, zipcode, specialties }) => {
    let errors = [];

    if (!name) {
        errors.push({ message: 'Please enter your name' });
    };

    if (!email) {
        errors.push({ message: 'Please enter your email' });
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

    if (!address) {
        errors.push({ message: 'Please enter your address' });
    };

    if (!zipcode) {
        errors.push({ message: 'Please enter your zipcode' });
    };

    if (!specialties) {
        errors.push({ message: 'Please select your specialties' });
    };

    return {
        errors,
        notValid: Boolean(errors.length)
    };
};
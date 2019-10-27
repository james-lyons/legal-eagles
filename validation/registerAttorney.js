module.exports = (
    {
        name,
        email,
        url,
        bio,
        city,
        state,
        zipcode,
        specialty,
        profile_image,
        password,
        password2
    }) => {

    let errors = [];

    if (!name) {
        errors.push({ message: 'Please enter your name' });
    };

    if (!email) {
        errors.push({ message: 'Please enter your email' });
    };

    if (!city) {
        errors.push({ message: 'Please enter your city' });
    };

    if (!url) {
        errors.push({ message: 'Please enter your url' });
    };

    if (!bio) {
        errors.push({ message: 'Please enter your bio' });
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
    
    if (!profile_image) {
        errors.push({ message: 'Please enter your profile image' });
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
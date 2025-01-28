const regexFirstName   = /^[A-Za-z]+$/;
const NotOneOfUserName = ['Admin', 'Root'];
const regexPhoneNumber = /^\+?[1-9]\d{1,14}$/;
const regexPassword    = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

module.exports = {
    regexFirstName,
    NotOneOfUserName,
    regexPhoneNumber,
    regexPassword,
}
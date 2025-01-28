const Yup = require('yup');
const { regex } = require('../../../Values');

const validate = async (req, res, next) => {
    const schema = Yup.object().shape({
        userName:    Yup.string().required().trim().notOneOf(regex.NotOneOfUserName),
        password:    Yup.string().required().trim().min(6).matches(regex.regexPassword),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
        next(); // Proceed if validation is successful
    } catch (error) {
        res.status(400).json({ message: error.errors }); // Return all validation errors
    }
};

module.exports = validate;
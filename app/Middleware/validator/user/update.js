const Yup = require('yup');
const { regex } = require('../../../Values');

const validate = async (req, res, next) => {
    const schema = Yup.object().shape({
        lastName:    Yup.string().optional().trim(),
        userName:    Yup.string().optional().trim().notOneOf(regex.NotOneOfUserName   ),
        password:    Yup.string().optional().trim().min(6).matches(regex.regexPassword),
        firstName:   Yup.string().optional().trim().matches(regex.regexFirstName      ),
        phoneNumber: Yup.string().optional().trim().matches(regex.regexPhoneNumber    ),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
        next(); // Proceed if validation is successful
    } catch (error) {
        res.status(400).json({ message: error.errors }); // Return all validation errors
    }
};

module.exports = validate;

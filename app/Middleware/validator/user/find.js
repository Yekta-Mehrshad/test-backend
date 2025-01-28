const Yup = require('yup');

const validate = async (req, res, next) => {
    const schema = Yup.object().shape({
        page: Yup.number() .optional() .min(1) .max(100),
        limit: Yup.number() .optional() .min(5) .max(100),
        search: Yup.string() .optional() .min(1) .max(20)
    });

    try {
        await schema.validate(req.query , { abortEarly: false });
        next(); // Proceed if validation is successful
    } catch (error) {
        res.status(400).json({ message: error.errors }); // Return all validation errors
    }
};

module.exports = validate;

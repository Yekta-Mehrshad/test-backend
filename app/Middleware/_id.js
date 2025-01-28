const Yup = require('yup');

const validate = async (req, res, next) => {
    const schema = Yup.object().shape({
        _id:      Yup.string().required().trim(),
    });

    try {
        await schema.validate(req.params, { abortEarly: false });
        next(); 
    } catch (error) {
        res.status(400).json({ message: error.errors });
    }
};

module.exports = validate;
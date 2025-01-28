const Yup = require('yup');

const validate = async (req, res, next) => {
    const schema = Yup.object().shape({
        text:      Yup.string().required().trim().min(1),
        receiver:  Yup.string().required().trim(),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
        next(); 
    } catch (error) {
        res.status(400).json({ message: error.errors });
    }
};

module.exports = validate;

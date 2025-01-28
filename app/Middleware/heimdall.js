const Yup = require('yup');
const jwt = require('jsonwebtoken');

const heimdall = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token);

        if (decodedToken && decodedToken.userName && decodedToken.userId) {
            const userName = decodedToken.userName;
            const userId = decodedToken.userId;

            req.user = req.user || {};
            req.user._id = userId;
            req.user.userName = userName;
            
            
            next();
        } 
        else {
            return res.status(400).json({ message: 'Invalid token payload' });
        }
    } else {
        console.log('No token found in Authorization header');
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
};

module.exports = heimdall;

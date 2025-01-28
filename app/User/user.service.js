/**
 * @file user.service.js
 * @path ~app/User
 * @description this file provides user services.
 */

const UserRepository = require("./user.repository");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {ErrorHandler} = require('../Handler');
const jwt = require('jsonwebtoken');
const utils = require('../utils/encrypt');
const encrypt = require("../utils/encrypt");

/**
 * @class UserService
 * @member createUser - kinda extract create user from repository
 * @member updateUser
 * @member findUser
 * @member deleteUser
 * @member userExistsById
 * @member throwErrorIfUserNotFound
 */
class UserService {
    constructor(methodes) {
        this.userRepository = methodes.UserRepository;
        this.errorhandler   = methodes.ErrorHandler;
    }

    createUser = async (arg1) => {
        const SALT_ROUND = 10; // Consider using process.env.SALT_ROUND if required

        // Hash the password from `arg1`
        arg1.password = await bcrypt.hash(arg1.password, SALT_ROUND);
        console.log(`Hashed password during creation: ${arg1.password}`);

        // Proceed with creating the user using the hashed password
        return await this.userRepository.createUser(arg1);
    }

    updateUser = async (_id, data) => await this.userRepository.updateUser(_id, data);

    findUser = async (arg1) => await this.userRepository.findUser(arg1);

    deleteUser = async (_id) => await this.userRepository.deleteUser(_id);

    userExistsById = async (_id) => await this.userRepository.userExistsById(_id);

    throwErrorIfUserNotFound = async (_id, res) => {
        const userExists = await this.userExistsById(_id);
        if (!userExists) {
            return res.status(404).send({ error: "User not found" });
        }
    }

    userFindOne = async (query) => await this.userRepository.userFindOne(query);

    /**
     * @method findUserByUserName
     * @description finds a user by their username.
     * @param {string} userName
     * @returns {Promise<Object>} User data
     */
    findUserByUserNameAndThrowErrorIfNotExist = async (userName) => {
        const user = await this.userFindOne({ userName });
        if (!user) {
            throw new this.errorhandler({ statusCode: 404, message: 'User not found' });
        }
        return user;
    }

    loginUser = async ({ userName, password }) => {

        // Find the user by username
        const user = await this.findUserByUserNameAndThrowErrorIfNotExist(userName);
        
        // Check if retrieved user is valid
        if (!user || !user.password) {
            console.error(`User retrieval failed or password is missing for user: ${userName}`);
            throw new this.errorhandler({ statusCode: 404, message: 'User or password not found' });
        }
        

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Password comparison failed for user: ${userName}`);
            throw new this.errorhandler({ statusCode: 401, message: 'Password does not match' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            process.env.JWT_SECRET_KEY, // Ensure you have a secret key in your environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        
        return { token };
    }
}

module.exports = new UserService({
    UserRepository, 
    ErrorHandler
});

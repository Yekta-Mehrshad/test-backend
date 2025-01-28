  /**
   * @file user.controller.js
   * @path ~/app/User
   * @description all the user routes are called ? in this file and they are somehow categorized in here.
   */
const Yup              = require('yup'           );
const jwt              = require('jsonwebtoken'  );
const UserService      = require('./user.service');
const {MongoValidator} = require('../Middleware' );
const {ErrorHandler  } = require('../Handler'    );
  /**
   * @class UserController
   * @member findUser   - find all without pagination.
   * @member createUser - create user based on a bodySchema.
   * @member updateUser - update users on database.
   * @member deleteUser - delete users on database.
   */
class UserController {
  /**
   * @property {class} mongoValidator - method to validate mongoDB IDs.
   * @property {class} userService - service for handling user operations.
   */
  constructor(methodes) {

      this.mongoValidator = methodes.MongoValidator;
      this.userService    = methodes.UserService;
  }
  /**
   * @async
   * @method findUser
   * @description Handles a request to find a user by delegating to the `userService`.
   * Sends the result back in the response or handles any errors that occur.
   * 
   * @param {Object<any>} req - The HTTP request object.
   * @param {Object<any>} res - The HTTP response object.
   * @returns {Promise<void>} Sends the found user data or an error message.
   * 
   * @throws Will send a 500 status code with an error message if an exception occurs.
   */
  findUser = async (req, res) => {
    try {
      const {search, page, limit} = req.query; // Ensure this is being retrieved correctly
  
      const result = await this.userService.findUser({search, page, limit});
      if (!result) {
        return res.status(404).send({ error: "User not found" });
      }
  
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: "Server error" });
    }
  }
  
  /**
   * @method createUser
   * @description creates user after checking if the username already doesnt exist.
   * @param {{
   *  body:{
   *  firstName: string
   *  lastName: string
   *  phoneNumber: string
   *  userName: string
   *  password: string
   * }
   * }} req
   * @param {Object<any>} res 
   */
  createUser = async (req, res) => {
    // try {

        const result = await this.userService.createUser(req.body);
        res.status(201).json(result);
    // }
    // catch{
    //     res.status(500).send({ error: "Server error" });
    // }
  }

  /**
   * @method updateUser
   * @description updates user after checking if the mongoDB ID is correct and if the ID exists in data base.
   * @param {{
   *  body:{
   *  firstName: string
   *  lastName: string
   *  phoneNumber: string
   *  userName: string
   *  password: string
   * }
   * params:{
   *  _id: Types.ObjectId || string 
   * }
   * }} req 
   * @param {Object<any>} res 
   */
  updateUser = async (req, res) => {
    // try {
      const _id  = req.params._id;
      const body = req.body;
      new this.mongoValidator._id(_id)
      await this.userService.throwErrorIfUserNotFound(_id, res);
      const result = await this.userService.updateUser(_id, body);
      res.send(result);
  }

  /**
   * @method deleteUser
   * @description deletes users after checking if the id is valid and if the id exists in data base.
   * @param {{
   * params:{
   * _id: Types.ObjectId || string 
   * }
   * }} req 
   * @param {Object<any>} res 
   */
  deleteUser = async (req, res) => {
    try {
        const _id = req.params._id;
        new this.mongoValidator._id(_id, res)
        await this.userService.throwErrorIfUserNotFound(_id, res);
        const result = await this.userService.deleteUser(_id);
        res.send(result);
    } catch {
        res.status(500).send({ error: "Server error" });
    }
  }

   /**
   * @method loginUser
   * @description logs in a user by checking credentials and generating a JWT token.
   * @param {{
   *  body:{
   *  userName: string,
   *  password: string
   * }
   * }} req
   * @param {Object<any>} res
   */
   loginUser = async (req, res) => {
    
    const result = await this.userService.loginUser(req.body);
    res.json(result);

  }
  

}

module.exports = new UserController({
    UserService,
    MongoValidator
});

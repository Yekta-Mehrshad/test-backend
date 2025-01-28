const express = require('express');
const {UserController} = require("../../User")
const {create, update, find, login} = require("../../Middleware/validator/user")
const router = express.Router();

const use = (fn) => (req, res, next) => {
    Promise.resolve( fn(req, res, next) ).catch(next)
}

router.get("/", find, use(UserController.findUser.bind(UserController)))
router.post("/", create, use(UserController.createUser.bind(UserController)))
router.put("/:_id", update, use(UserController.updateUser.bind(UserController)))
router.delete("/:_id", use(UserController.deleteUser.bind(UserController)))
router.post("/login", login ,use(UserController.loginUser.bind(UserController)))

module.exports = router;
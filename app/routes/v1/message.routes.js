const express = require('express');
const {MessageController} = require("../../Message")
const router = express.Router();
const heimdall = require('../../Middleware/heimdall')
const {create, update} = require("../../Middleware/validator/message")
const _id = require('../../Middleware/_id')

const use = (fn) => (req, res, next) => {
    Promise.resolve( fn(req, res, next) ).catch(next)
}

router.post("/", create, heimdall, use(MessageController.createMessage.bind(MessageController)))
router.put("/:_id", _id, update, heimdall, use(MessageController.updateMessage.bind(MessageController)))
router.delete("/:_id", heimdall, use(MessageController.deleteMessage.bind(MessageController)))

module.exports = router;
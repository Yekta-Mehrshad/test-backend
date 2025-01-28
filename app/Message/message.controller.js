const MessageService = require('./message.service')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const decrypt = require("../utils/decrypt");
const heimdall = require('../Middleware/heimdall')
const {MongoValidator} = require('../Middleware' );

class MessageController {
    constructor(methodes) {
        this.messageService = methodes.MessageService;
    }

    createMessage = async (req, res) => {

            const user = req.user;
            const {text, receiver} = req.body;
            const newMessage = await this.messageService.createMessage({
                sender: req.user._id,
                receiver,
                text,
            });
           

            res.status(201).json(newMessage);
    }

    updateMessage = async (req, res) => {

            const  messageId = req.params._id; 
            const { text } = req.body;  
            const senderId = req.user._id;  

            const updatedMessage = await this.messageService.updateMessageText(messageId, {senderId, text});

            res.status(200).json(updatedMessage);
    }

    deleteMessage = async (req, res) => {

        const result = await this.messageService.deleteMessage({
            userId : req.user._id, 
            messageId : req.params._id, 
            isDeletedForBoth: req.query.isDeletedForBoth
        });


        res.status(200).json(result);
      }
}
module.exports = new MessageController({
    MessageService,
});

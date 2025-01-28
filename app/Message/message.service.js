const { text } = require('express');
const Message = require('../Message/message.model')
const MessageRepository = require('./message.repository');
const {ErrorHandler} = require('../Handler');

class MessageService {
    constructor(methodes) {
        this.messageRepository = methodes.MessageRepository;
        this.errorhandler   = methodes.ErrorHandler;
    }

    async createMessage({sender, receiver, text, isEdited = false}) {
    
        const messageData = {
            text,
            isEdited,
            receiver,
            sender
        };
        return await this.messageRepository.createMessage(messageData);
    }

    updateMessage = async (_id, data) => await this.messageRepository.updateMessage(_id, data);

    async updateMessageText(messageId, values) {
        // if (!messageId) {
        //     throw new Error('Message ID is required');
        // }
        // if (!text) {
        //     throw new Error('Text is required for update');
        // }
        const message = await this.messageRepository.findByIdMessage(messageId);
        if (!message) {
            throw new Error('Message not found');
        }
        
        if (message.sender.toString() !== values.senderId.toString()) {
            throw new Error('You are not authorized to edit this message');
        }

        const updateData = {
            text : values.text
        };
   
        return await this.updateMessage(messageId, updateData);
    }

    messageExistsById = async (_id) => await this.messageRepository.messageExistsById(_id);
    /**
     * @description throws an error if the message doesn't exist
     * @param {Types.ObjectedId || string} _id
     * @async 
     * @method
     * @return any
     */
    async findMessageByIdAndThrowErrorIfNotExist (_id) {
        const MessageExists = await this.messageExistsById(_id);
        if (!MessageExists) {
            throw new this.errorhandler({ statusCode: 404, message: 'Message not found' });
        }
        return MessageExists
    }

    async deleteMessage ({messageId, userId, isDeletedForBoth})  {
        const foundMessage = await this.findMessageByIdAndThrowErrorIfNotExist(messageId);
        if (foundMessage.sender.toString() === userId.toString()){
            if(isDeletedForBoth === "true"){
                return await this.updateMessage(messageId, {
                    isDeletedBySender: true,
                    isDeletedByReceiver: true
                })
            } else {
                return await this.updateMessage(messageId, {
                    isDeletedBySender: true
                })
           }
        
        } else if(foundMessage.receiver.toString() === userId.toString()){
            //isDeletedForReceiver=true
            return await this.updateMessage(messageId, {
                isDeletedByReceiver: true
            })
        } else {
            //error
            throw new this.errorhandler({ statusCode: 403, message: 'You are not allowed to delete this message' });
        }

    }
}
   

module.exports = new MessageService({MessageRepository, ErrorHandler});

const Message = require('./message.model');

class MessageRepository {
    constructor(Message) {
        this.message = Message;
    }

    createMessage = async ({ text, isEdited=false, receiver, sender }) => {
        return await this.message.create({
            text,
            isEdited,
            receiver,
            sender
        });
    }

    updateMessage = async (_id, { text, isEdited=true, isDeletedBySender, isDeletedByReceiver, sender, receiver}) => {
        return await this.message.findByIdAndUpdate(
            _id,
            {
                text,
                isEdited,
                isDeletedBySender,
                isDeletedByReceiver,
                sender,
                receiver,
            },
            {new: true}
        );
    }

    findByIdMessage = async (_id) => {
        return await this.message.findById(_id);
    }

    /**
     * @description checks that if the message exists or not by Id
     * @async
     * @method 
     * @param {Types.ObjectedId || string} _id 
     * @returns Promise <Message>
     */
    messageExistsById = async (_id) =>  await this.message.findById(_id);

}

module.exports = new MessageRepository(Message);

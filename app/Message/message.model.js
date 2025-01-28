const mongoose = require('mongoose');



const messageSchema = new mongoose.Schema({
    text:     {type:String, trim:true},
    isEdited: {type:Boolean, required:false},
    sender:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isDeletedBySender: {type:Boolean, required:false},
    isDeletedByReceiver: {type:Boolean, required:false}
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
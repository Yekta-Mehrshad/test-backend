const mongoose = require('mongoose');
const {ErrorHandler} = require('../../../Handler')
class _id {
    constructor (_id) {
        if (!_id || !mongoose.isValidObjectId(_id)) {
            throw new ErrorHandler({
                statusCode:4000,
                httpCode: 400,
                message:"invalid user id"
            })
            
         }
    }
}

module.exports = _id ;
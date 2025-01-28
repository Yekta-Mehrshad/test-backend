const mongoose = require('mongoose');

function validateUserName (value) {

    const reservedUserNames = ['admin', 'root'];
    return !reservedUserNames.includes(value.toLowerCase());
}

const userSchema = new mongoose.Schema({
    lastName:    { type: String, required: true,  trim: true },
    firstName:   { type: String, required: true,  trim: true, match: /^[A-Za-z]+$/},
    phoneNumber: { type: String, required: false, trim: true, match: /^\+?[1-9]\d{1,14}$/},
    userName:    { type: String, required: true,  trim: true, validate: { validator: validateUserName}, unique: true  },
    password:    { type: String, required: true, select: false },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
},
{
    toJSON: {
        transform: function(doc, ret, options) {
            delete ret.password;  // Remove password field
            delete ret.__v;       // Remove __v field
            return ret;
        }
    },
    toObject: {
        transform: function(doc, ret, options) {
            delete ret.password;  // Remove password field
            delete ret.__v;       // Remove __v field
            return ret;
        }
    }
});


userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// userSchema.methods.toJSON = function() {
//     const user = this.toObject();
//     delete user.password;  // Remove the password field
//     return user;
// };

const User = mongoose.model('User', userSchema);


module.exports = User;

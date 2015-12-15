/*
 * schemas/user.js
 * 
 */

var mongoose = require('mongoose');
var emailRegExp = /.+\@.+\..+/;

var checkLength = function (val) {
    if (val && val.length < 10) {
        return true;
    } else {
        return false;
    }
};

var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: { type: String, index: true },
    profession: String,     
    email: {
        type: String,
        required: true,
        //match: emailRegExp,
        //custom validatieregel, zodat deze message niet engels is
        validate: {
            validator: checkLength,
            message: "Niet meer dan 10 karakters"
        }
    },
    gender: {
        type: String,
        required: true,
        uppercase: true,
        //enkel deze 2 values
        trim: true,
        enum: ['M', 'F']
    },
    createdOn: { type: Date, 'default': Date.now },
    lastLogin: Date
});

module.exports = UserSchema;
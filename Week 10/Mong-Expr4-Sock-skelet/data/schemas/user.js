/*
 * schemas/user.js
 * 
 */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: { type: String, index: true },
    profession: String, 
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/
    },    
    gender: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        enum: ['M', 'F']
    },
    createdOn: { type: Date, 'default': Date.now },
    lastLogin: Date
});

module.exports = UserSchema;
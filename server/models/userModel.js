const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, ' email is required']
    },
    gender: {
        type: String,
        required: [true, 'gender is required']
    },
    age: {
        type: Number,
        required: [true, 'age is required']
    },
    phone: {
        type: Number,
        required: [true, 'phone number is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    // confirm: {
    //     type: String,
    //     required: [true, 'password is matched']
    // }


});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;
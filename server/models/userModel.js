const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    // },
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    // isDoctor: {
    //     type: Boolean,
    //     default: false
    // }

});
// Compare password method
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;
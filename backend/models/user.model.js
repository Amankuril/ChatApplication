// const mongoose = require('mongoose');
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    profilePic: {
        type: String,
        default: ""
    }

},
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);


// module.exports = User;
export default UserModel;

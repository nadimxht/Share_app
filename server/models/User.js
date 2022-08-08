const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        // otp: {
        //     type: String,
        //     required: true,
        // },

        // otpexpiry: {
        //     type: String,
        //     required: true,
        // },
        online: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;

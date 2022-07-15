const mongoose = require('mongoose');

const schema = mongoose.Schema({
    date: {
        type: Date,
        default: Date().now,
        // required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    //ill chnage later
    imgSrc: { type: String, default: '' },

});

const UserModal = mongoose.model('User', schema);
module.exports = UserModal;
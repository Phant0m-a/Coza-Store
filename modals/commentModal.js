const mongoose = require('mongoose');

const schema = mongoose.Schema({

    email: { type: email, required: true },
    message: { type: String, required: true },
    imgSrc: { type: String, default: '' },
    date: {
        type: Date,
        default: Date().now,
        // required: true
    },

});

const CommentModal = mongoose.model('Comment', schema);
module.exports = CommentModal;
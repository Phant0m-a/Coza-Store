const mongoose = require('mongoose');

const schema = mongoose.Schema({

    email: { type: email, required: true },
    message: { type: String, required: true },
    date: {
        type: Date,
        // default: Date().now,
        required: true
    },

    comment: { type: String, required: true },
    name: { type: String, required: true },
    website: { type: String, default: 'www.CozaStore.com', required: true },
    date: {
        type: Date,
        default: Date().now,
        // required: true
    },
});

const FeedbackModal = mongoose.model('Feedback', schema);
module.exports = FeedbackModal;
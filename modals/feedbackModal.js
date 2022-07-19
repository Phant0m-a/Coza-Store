const mongoose = require('mongoose');

const schema = mongoose.Schema({

    email: { type: String, required: true },
    message: { type: String, required: true },
    // comment: { type: String, required: true },
    name: { type: String, required: true },
    // website: { type: String, default: 'www.CozaStore.com', required: true },
    date: {
        type: Date,
        default: Date().now,
        // required: true
    },
});

const FeedbackModal = mongoose.model('Feedback', schema);
module.exports = FeedbackModal;
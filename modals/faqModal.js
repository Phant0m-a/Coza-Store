const mongoose = require('mongoose');

const schema = mongoose.Schema({

    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, required: true },


});

const faqModal = mongoose.model('faq', schema);
module.exports = faqModal;
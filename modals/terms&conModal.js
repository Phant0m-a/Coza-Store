const mongoose = require('mongoose');

const schema = mongoose.Schema({

    terms: { type: String, required: true },
   


});

const termsAndConModal = mongoose.model('terms', schema);
module.exports = termsAndConModal;
const mongoose = require('mongoose');

const schema = mongoose.Schema({

    title:{type: String,required: true}

});

const ProductType = mongoose.model('ProductType', schema);
module.exports = ProductType;
const mongoose = require('mongoose');

const schema = mongoose.Schema({

    description:{type: String,required: true}

});

const copyRightModal = mongoose.model('Copyright', schema);
module.exports = copyRightModal;
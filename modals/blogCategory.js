const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, required: true },

});

const BlogCategory = mongoose.model('BlogCat', schema);
module.exports = BlogCategory;
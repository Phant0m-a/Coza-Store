const mongoose = require('mongoose');

const schema = mongoose.Schema({
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    paragraph: { type: String, required: true },
    comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    date: Date,
    author: { type: String, required: true }, //* it can be ref('Author') or ref('User').
    tags: [{
        type:String,
    }], // first three tags could be included in blog card.
    catagory: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory' }
});

const BlogModal = mongoose.model('Blog', schema);
module.exports = BlogModal;
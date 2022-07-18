const mongoose = require('mongoose');

const schema = mongoose.Schema({
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    discription: { type: String, required: true },
    subHeading: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    date: {
        type:Date,
        default:Date()  
    },
    author: { type: String, required: true }, //* it can be ref('Author') or ref('User').
    tags: [{
        type: String,
    }], // first three tags could be included in blog card.
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory' }
    ,drafted:{
        type:Boolean,
        default:false
    }
});

const BlogModal = mongoose.model('Blog', schema);
module.exports = BlogModal;
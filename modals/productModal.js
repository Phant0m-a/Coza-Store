const mongoose = require('mongoose');

const schema = mongoose.Schema({
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    // 
    size: ['s','m','l','xl'],
    // size: [{ type: String, default: 'l' }],//s,m,l,xl, required
    // COLOR AND QUANTITY IS SELECTED BY USER HIMSELF SO we SHOULD  ADD 2 DIFFERENT SCHEMAS FOR BOTH ✅☑✔if real life
    // color: [{ type: String, default: 'white' }],//red, blue, white, grey, required	
    color:['white','blue','black','grey'],
    quantity: { type: Number, Default: 1, },
    featured: { type: Boolean, Default: false },//bool
    description: { type: String, default: '' },
    productImg: [{
        imgSrc: { type: String, index: { type: Number, default: 0 } },
        //&favorite [each img find mechanism ]
    }],
    //implement favorites mechanism for every user (how to determine or save if user has FAV 	some item)
    productType: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
    //male, female, watch, bag, watch etc.
});

const ProductModal = mongoose.model('Product', schema);
module.exports = ProductModal;
const mongoose = require('mongoose');

const schema = mongoose.Schema(
    [
        {
            title: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
            date: {
                type: Date,
                default: Date().now,
                // required: true
            },
            Total: Number
        }
    ]);

const CartModal = mongoose.model('Cart', schema);
module.exports = CartModal;
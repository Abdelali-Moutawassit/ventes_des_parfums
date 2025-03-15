//model de cart contient les produits qui save par un utilisateur
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'parfum'
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

module.exports = Cart = mongoose.model('cart', CartSchema);
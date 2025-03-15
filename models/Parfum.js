//model parfum
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParfumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = Parfum = mongoose.model('parfum', ParfumSchema);
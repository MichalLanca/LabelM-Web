const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    available: {
        type: String,
        required: true,
    },
    points: {
        type: String,
        required: true,
    },
    desc_short: {
        type: Array,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    use: {
        type: String,
        required: true,
    },
    image_main: {
        type: String,
        required: true,
    },
    image_range: {
        type: Array,
        required: true,
    },
    image_small: {
        type: String,
        required: true,
    }, 
    video: {
        type: String,
        required: true,
    },
    next_products: {
        type: Object,
        required: true,
    },
    filter: {
        type: Array,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
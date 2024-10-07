const mongoose = require('mongoose');

const fashionSchema = new mongoose.Schema({
    idBackstage: {
        type: Number,
        required: true
    },
    names: {
        type: Array,
        required: true
    }
})

const FashionWeek = mongoose.model("FashionWeek", fashionSchema)

module.exports = FashionWeek
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    power: {
        type: String,
        required: true
    },
    attackpower: {
        type: Number,
    },
    hair_color: {
        type: String,
    }
});

module.exports = mongoose.model('AnimeChars', schema);
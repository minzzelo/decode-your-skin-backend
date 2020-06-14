const mongoose = require('mongoose');
const { text } = require('body-parser');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
    }, 

    description: {
        type: String
    }, 

    ingredients: {
        type: String,
    }
})

module.exports = mongoose.model('Product', productSchema);
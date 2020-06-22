const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        productName: {
            type: String, 
            required: true, 
            unique: true,
        }, 

        ingredients: {
            type: String
        }, 

        ingredDetails: {
            type: [{}],
        }, 
    
    }
)


module.exports = mongoose.model('Product', productSchema);
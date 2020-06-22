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

        imageURL: {
            type: String
        }
    
    }
)


module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        productName: {
            type: String, 
            required: true, 
            unique: true,
        }, 

        description: {
            type: String
        }, 
        
        ingredients: {
            type: String
        }, 

        ingredDetails: {
            type: [{}],
        }, 

        imageURL: {
            type: String
        }, 

        score: {
            type: String
        }
    
    }
)


module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        trim: true, 
        required: true, 
        unique: true,
    }, 

    email: {
        type: String, 
        trim: true, 
        required: true, 
        unique: true,
    }, 
    
    password: {
        type: String , 
        required: true, 
        minlength: 8,
    }, 

    //one to many relationship 
    products : 
    [
        {type : Schema.Types.ObjectId, 
         ref : 'Product'
        }
    ]
    
});


userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const User = mongoose.model('User', userSchema);
module.exports = User;
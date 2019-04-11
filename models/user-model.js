
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema= new Schema(
    {
        role: String,
        username : String,
        googleId : String,
        password : String,
        image : String,
        imageURL : String,
        cart : [String]
    }
);

User = mongoose.model('user',userSchema);

module.exports=User;
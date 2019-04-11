const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fCartSchema= new Schema(
    {
        cart :{Name: [String],
        	quan : [Number]
        },
        mainid : String,
        id : String



    }
);

fCart = mongoose.model('fcart',fCartSchema);

module.exports=fCart;
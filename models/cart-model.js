
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema= new Schema(
    {
        item : [String],
        quantity : String,
        price : String,
       	


    }
);

Cart = mongoose.model('cart',cartSchema);

module.exports=Cart;
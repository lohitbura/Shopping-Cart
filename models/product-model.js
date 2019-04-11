
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema= new Schema(
    {
        name : String,
        quantity : Number,
        price : Number,
        image : [String]

    }
);

Product = mongoose.model('product',productSchema);

module.exports=Product;
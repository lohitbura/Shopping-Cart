
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const adminSchema= new Schema(
    {
        username : String,

        password : String
    }
);

Admin = mongoose.model('admin',adminSchema);

module.exports=Admin;
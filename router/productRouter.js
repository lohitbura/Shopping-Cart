var express = require('express');
router = require('express').Router();
var multer = require('multer');
var app = express();
var ejs = require('ejs');
var path = require('path');
const Product =require('../models/product-model');
var x;
var a=[];


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/productUploads')
    },
    filename: function (req, file, cb) {
        x=file.fieldname +'-'+Date.now()+''+ path.extname(file.originalname);
        a.push(x);
        cb(null, x );
    }
});

//init upload
app.set('view engine', 'ejs');
router.use(express.static(__dirname + 'public/productUploads'));
router.get('/', function (req, res) {
    res.render('adminProfile');
});
var upload = multer({ storage: storage, limits: { fileSize: 100000000 } });
router.post('/',upload.array('productPic'), function (req, res) {

Product.findOne({name:req.body.productName}).then((product)=> {


    if (product)
    {
        console.log('product already exit in database');
        res.render('adminProfile',{user : req.user});
    }
    else{

        new Product(
            {
                name : req.body.productName,
                quantity : req.body.Quantity,
                price : req.body.Price,
                image : a
            }
        ).save((err,newProduct)=>
        {
            if (err) return err;
            console.log('added');

            res.render('adminProfile',{user : req.user});
        })

        var l= a.length;
        for(var i=0;i<l;i++)
        {
            a.pop();
        }


    }

})


} );




module.exports = router;

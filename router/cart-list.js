var express = require('express');
// Product = require('../models/product-model');
var router = require('express').Router();




var app = express()

function addToCart(t,data){
    var a = [];




            if(data!==undefined && data!==null) {
                console.log('data is', data);

                for(var i=0;i<data.length;i++)
                {
                    a[i]=data[i];
                }
                a.push(t);
                console.log(a);
            }
            else
                a.push(t);
            return a;



}


router.get('/',(req,res)=>
{
   // console.log('in the cart list');
  var  id =req.query.id;
  var q = req.query.q;
  

  console.log('svshvjvsvsdhvshvshvshvjshvdjshvjkhvjhvhvjhvjvhsvhsv    is',q);
    Product.find({_id: id},(err, product)=>
    {
        // var check;

        console.log(product[0].quantity);
        var t={
            name : product[0].name,
            q : q,
            price : product[0].price,
            id : id
        };




        req.session.cart= addToCart(t,req.session.cart);

        console.log(id);
        console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd');
        console.log(req.session.cart);

        console.log('lohhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhiiiiiiii');
        // Cart = req.session.cart;
        // Cart.push(id);
        // req.session.cart=Cart;
        // console.log("its id is",req.session.cart);
        // product[0].set({ quantity: product[0].quantity-1});
        // product[0].save();
        console.log('product iss',product);
        res.send({
            product : product
        })
    })

});

router.get('/delete',(req,res)=>
{

    var  id = req.query.id;
        console.log("aaya aaya aaya"+id)
         Product.deleteOne({ _id : id }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});
         res.send({
            id:id
         })
})

module.exports = router;
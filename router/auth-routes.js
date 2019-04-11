var passport = require('passport');
var router = require('express').Router();
var userController = require('../controller/login-controller');
var fCart = require('../models/final-cart-model')

router.route('/login').get(userController.login);

router.route('/logout').get(userController.logout);



router.post('/signup',(req,res)=> {
    console.log(req.body);
    User.findOne({username: req.body.username}).then((currentUser) => {
        if (currentUser) {
            console.log("user is" + currentUser);
            res.redirect('/');
        }
        else {
            new User(
                {
                    username: req.body.username,
                    password: req.body.password


                }
            ).save().then((newUser) => {
                    console.log("new user is" + newUser);

                    res.redirect('/');
                }
            );
        }
    });
});

router.get('/goodBye',(req,res)=>
{

    var a=[],b=[],c=[],q1=[];
    console.log('length is '+req.session.cart.length);
    var l = req.session.cart.length;
    for(var i=0;i<l;i++)
    {
        console.log(req.session.cart[i].name);
        console.log("aaayyyyaaayaayaayayayaaayaaayyyaaa",req.session.cart[i].q);
        b[i]=req.session.cart[i].name;
        q1[i]=req.session.cart[i].q;
    }
    for(var i =0;i<l;i++)
    {
         a.push(b[i]);
         c.push(q1[i]);
         console.log("yhaa ab  nhi hoga ",q1[i]);
         var x = q1[i];
         Product.findOne({name:b[i]}).then((product)=> {
            console.log("yaaaaar aaaa jaaaaaio pllssssss",x);
        product.quantity = product.quantity - x;
        
        console.log(product.quantity);
            console.log('quantity is '+product.quantity);
        product.save();
        
         
       
        console.log(a);
    })
    }
    new fCart(
    {
        mainid : req.user.id,
        cart : {Name :a , quan : c},
        id : req.user.username
    }).save();
    if (req.session) {
        req.session.cart = null;


            res.render('index',{user:req.user , admin:req.session.admin});
        
    }
});

router.route('/signup').get(userController.signup);

router.route('/cart').get(userController.cart);

router.post('/local',passport.authenticate('local',{

        successRedirect:'/profile/show',
        failureRedirect: '/user/login'
    })
);

router.get('/google',passport.authenticate('google',{
        scope : ['profile']
    })
);

router.use('/google/redirect',passport.authenticate('google'),(req,res)=>
{
    console.log(req.user.username);
    res.redirect('/profile/show');


});



module.exports=router;
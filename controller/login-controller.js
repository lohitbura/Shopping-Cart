

module.exports.login=(req,res)=>
{

  res.render('login',{user:req.user});
};

module.exports.logout=(req,res)=>
{
  req.logout();

  res.redirect('/user/login');
};

module.exports.signup=(req,res)=>
{
    res.render('signup',{user:req.user});
};

module.exports.cart=(req,res)=>
{
console.log('caaaarttttt',req.session.cart)
 res.render('cartList',{cart: req.session.cart , user : req.user})

};

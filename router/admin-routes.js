
express = require('express');
router = require('express').Router();
var keys = require('../config/keys');
const Admin =require('../models/admin-model');

router.get('/login',(req,res)=>
{
    res.render('adminLogin',{user: req.user});
});

router.get('/logout',(req,res)=>
{
	req.session.admin = null;
	res.redirect('/');
})


router.post('/profile',(req,res)=>
{

  if(req.body.username===keys.admin.username && req.body.password===keys.admin.password)
  {
  	
  	req.session.admin = req.body.username;
      
  }

  if(req.session.admin)
  {
  	res.render('adminProfile',{user: req.user});
  }
  else
  {
      res.redirect('/');
  }

});

router.get('/profile',(req,res)=>
{
	if(req.session.admin)
	{
		res.render('adminProfile',{user: req.user});
	}
})

router.get('/order',(req,res)=>
{
if(req.session.admin){
	
	
	res.render('order');
}
else
{
	res.redirect('/');
}

})



module.exports = router;
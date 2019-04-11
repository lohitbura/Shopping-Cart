router = require('express').Router();

const authCheck = (req,res,next)=>
{
    console.log('yha aaya')
    if(!req.user)
    {
        res.redirect('/user/login');
    }
    else{
        next();
    }
};


router.get('/',authCheck,(req,res)=>{
    console.log('aa gya yha to');
    res.render('profile',{user:req.user})
});


router.get('/personal-Cart', function(req,res,next){

    id = req.user.id;
    console.log('yha aaya k nhi bbhai')
    console.log("thi is id ",id);
    fCart
    .find({mainid : id})
    .exec(function(err,fcarts){
        console.log('these are products',fcarts);
        var total = fcarts.length;
        res.send({
            fcarts : fcarts,
            total : total
        })
    

})
})


module.exports= router;
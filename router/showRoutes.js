router = require('express').Router();

router.get('/', function (req, res) {

    res.render('index',{user: req.user , admin: req.session.admin});
});

router.get('/show-product', function(req, res, next) {
    var perPage = 8;
    var page = Number(req.query.page);

    Product
        .find({})
        .skip((perPage * page))
        .limit(perPage)
        .exec(function(err, products) {

            Product.count().exec(function(err, total) {
                 if (err) return next(err);
                res.send({
                    products: products,
                    total: total,
                    current: page,
                    count: Math.min(perPage, total-(perPage*page)),
                    pages: Math.ceil(total / perPage)

                })
            })
        })
});


router.get('/show-Cart', function(req,res,next){

    fCart
    .find({})
    .exec(function(err,products){
        console.log(products);
        fCart.count().exec(function(err,total){
        if (err) return next(err);
        res.send({
            products : products,
            total : total
        })
    })

})
})

module.exports= router;
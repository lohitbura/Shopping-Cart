var express = require('express');
var passport= require('passport');
var passportSetup= require('./config/passport-setup');
var app = express();
var path = require('path');
var adminRouter = require('./router/admin-routes')
var userRouter = require('./router/auth-routes');
var profileRouter = require('./router/profile-routes');
var showRouter= require('./router/showRoutes');
var imageRouter = require('./router/imageRouter');
var productRouter = require('./router/productRouter');
var addCartList = require('./router/cart-list');
var multer = require('multer');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
// to attach body with every request 
const bodyParser = require('body-parser');
//const cookieSession = require('cookie-session');

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/mrbrownshop",{ useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
// var keys= require('./config/keys');
// mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true },()=>
// {
//     console.log("connected to database baby");
// });


app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
   // store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {maxAge : 60*60*1000 }
}));


app.use((req,res,next)=>
{
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// app.use(cookieSession({
//     maxAge : 24*60*60*1000,
//     keys: [keys.session.sessionKey]
// }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',showRouter);
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/profile/show',profileRouter);
app.use('/profile',imageRouter);
app.use('/admin/product',productRouter);
app.use('/cart-list',addCartList);








app.get('/hello', (req, res) =>{
    console.log(req.query, req.param, req.body);
    res.send({id: "Hello World"})
})

app.listen(3000,()=>
{
    console.log('listening at port 9000');
});
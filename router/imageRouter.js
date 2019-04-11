var express = require('express');
router = require('express').Router();
var multer = require('multer');
var app = express();
var ejs = require('ejs');
var path = require('path');
var x;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profileUploads/')
    },
    filename: function (req, file, cb) {
        x=Date.now()+''+ path.extname(file.originalname);
        cb(null,file.fieldname +'-'+ x );
    }
});
//init upload
app.set('view engine', 'ejs');
router.use(express.static(__dirname + 'public/profileUploads'));
 router.get('/', function (req, res) {
     res.render('profile');
 });
var upload = multer({ storage: storage, limits: { fileSize: 100000000 } });
router.post('/',upload.single('profilePic'), function (req, res) {

    //var upload = multer({ storage: storage, limits: { fileSize: 100000000 } }).single('profilePic');
    // req.file is the `myImage` file
    // upload(req, res, function (err) {
    //     x=req.file.filename;
    //     console.log(req.user.username); if (err) { console.log(err); } else { console.log("hello" + storage);

    User.findById(req.user.username, function (err, user) {

        console.log(req.user.username);

        req.user.set({ image: 'profilePic-'+x});
        console.log(req.user.image);
        req.user.save(function (err, updatedTank) {

            res.render('profile',{user: req.user});
        });
    });
        } );




module.exports = router;

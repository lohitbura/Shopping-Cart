const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;

const keys = require('./keys');

const User =require('../models/user-model');

passport.serializeUser((user,done)=>
{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>
{
    User.findById(id).then((user)=>
    {
        done(null,user);
    })
});



passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password!==password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));



passport.use(

    new GoogleStrategy({
            callbackURL : 'user/google/redirect',
            clientID : keys.google.clientID,
            clientSecret : keys.google.clientSecret

        },

        (accessToken,refreshToken,profile,done)=>
        {
            // console.log(profile._json.image.url);
            User.findOne({googleId : profile.id}).then((currentUser)=>
            {
                if(currentUser)
                {
                    console.log("user is"+currentUser);
                    done(null,currentUser);
                }
                else
                {
                    new User(
                        {

                            username : profile.displayName,
                            googleId: profile.id,
                            imageURL: profile._json.image.url.slice(0,-6)
                        }
                    ).save().then((newUser)=>
                        {
                            console.log("new user is"+newUser);
                            done(null,newUser);
                        }

                    );

                }
            })


        })
);
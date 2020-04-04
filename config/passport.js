var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new  LocalStrategy(
    //Sing in using an email
    {
        usernameField: "email"
    },
    function (email, password, done){
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser){
            //Authenticate email
            if (!dbUser){
                return done(null, false, {
                    message: "Incorrect Email."
                });
            }
            //Authenticate Password
            else if (!dbUser.validPassword(password)){
                return done (null, false, {
                    message: "Incorrect Password."
                });
            }
            //User Authentication Completed then
            return done (null, dbUser);
        });
    }
));

//Keep authentication state across HTTP requests
passport.serializeUser(function (user,cb){
    cb (null, user);
});

passport.deserializeUser(function (obj, cb){
    cb (null, obj);
});

//Export conigured passport 
module.exports = passport;
'use strict'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./user-model');
const passport = require('passport');
const request = require('request');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

const uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/guild';

///// Parsing json
app.use(bodyParser.json());
///// Parsing urlencoded
app.use(bodyParser.urlencoded({extended: true}));
///// Serving static files from ./www
app.use(express.static(path.join(__dirname, './www')))
///// Route handler for homepage
app.get('/', function (req, res) {
  ///// Send homepage
  res.sendFile('index.html', {root : './www'})
});
///// Used to create user session
const session = require('express-session')
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      }
})
app.use(app.sessionMiddleware)
///// Connecting to MONGODB
mongoose.connect(uristring, function(error) {
  ///// If error connecting to MongoDB
  if (error) {
      console.error(error);
  ///// If successfully connected to MongoDB
  } else {
      console.log('Mongoose connected successfully')
  }
})

const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize()); // Tells server that we want to use passport.  Gives passport access to what's going on in our server
app.use(passport.session());  // Sessions are how our servers remember who we are - so we give passport access to them.  Passport will automatically store / retrieve data from our sessions for us

// cookies are strings. strings are "SERIAL" data.
passport.serializeUser(function(user, done) {
    done(null, user.id);
}); // What passport is storing on the client (cookie)
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
}); // How passport finds the corresponding user using the cookie

// When someone tries to log in to our site, how do we determine that they are who they say they are?
const bcrypt = require('bcryptjs')
// the user will POST to /login, with req.body.username and req.body.password
// by default, passport looks at req.body.username / req.body.password
passport.use(new LocalStrategy(
    function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false); // No error and no user
            }
            // If we got this far, then we know that the user exists. But did they put in the right password?
            bcrypt.compare(password, user.password, function(error, matched){
                if (matched === true){
                    return done(null,user) // No error and this is the user they should be signed in as
                }
                else {
                    return done(null, false) // Passwords didn't match no error and no user
                }
            })
        });
    }
));
/** End Passport Config **/
/** Middleware **/
app.isAuthenticated = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    console.log('get outta here!')
    res.redirect('/');
}
/** END Middleware **/
app.post('/register', function(req, res){
    console.log('Body : ', req.body);
    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            let newUser = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                age: req.body.age,
                location: req.body.location
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }) }
                else {
                    req.logIn(user, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }) }
                        else { res.send({success: 'success'}) }
                    })
                }
            })
        })
    })
})
app.post('/login', function(req, res, next){
    console.log('Body : ', req.body);
    //function being passed into authenticate method as the 2nd argument is the done function from the LocalStrategy
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:'success'});
        });
    })(req, res, next);
})
///// Set up server listening port
app.listen(port, function () {
    console.log('Server started at http://localhost:' + port)
})

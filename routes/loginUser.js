const { application } = require('express');
const   User        =       require('../models/user'),
        passport    =       require('passport'),
        bcrypt      =       require("bcrypt"),
        cookie      =       require('cookie-parser'),
        jwt         =       require('jsonwebtoken'),  
        express     =       require('express'),
        app         =       express(),
        expressSession        =       require('express-session'), 
        passportLocal   =   require('passport-local');


app.use(expressSession({
    secret:'jnjrefnj',
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge: 60*60*1000}
}))
async function loginUser(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) 
      { 
        req.flash("error","Authentication went Wrong")
        return next(err); }
      if (!user) { 
        req.flash("error","Invalid Username or Password")
        return res.redirect('/login'); }
      if(user.isVerified == false){
          req.flash("error", "Please verify Your Email")
          res.redirect("/login");
        }

      req.logIn(user, function(err) {
        if (err) { 
          req.flash("error","Invalid Username or Password");
          return res.redirect('/login'); }
          

        req.flash("success",`Succesfully Signed In, Welcome ${req.user.username}`)
        return res.redirect('/');
      });
    })(req, res, next);
  };
module.exports = loginUser;
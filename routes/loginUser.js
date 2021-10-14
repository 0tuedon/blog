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
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      console.log(user);
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  };
module.exports = loginUser;
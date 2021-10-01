const   User        =       require('../models/user'),
        passport    =       require('passport'),
        passportLocal   =   require('passport-local');


  
module.exports =   passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'



})
const bcrypt        =       require('bcrypt'),
        User        =       require('../models/user'),
        passport    =       require('passport'),
        passportLocal   =   require('passport-local');
const { reject } = require('bcrypt/promises');

function loginUser(req,res){
    passport.authenticate('local',
    {
       successRedirect:"/" ,
       failureMessage:"/auth/register"
    }
    ),(req,res)=>{
    }

}
module.exports = loginUser
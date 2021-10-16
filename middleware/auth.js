const User = require('../models/user');
const flash = require('connect-flash')


module.exports = (req,res,next)=>{
    if(!req.user){
        req.flash("error","Please Login");
        return res.redirect('/login');
    }
    else{
        next();
    }
}

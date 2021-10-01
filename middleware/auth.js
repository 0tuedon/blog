const User = require('../models/user');

module.exports = (req,res,next)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    else{
        next();
    }
}

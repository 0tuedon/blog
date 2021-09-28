const User = require('../models/user'),
passport   = require('passport')

function createUser (req,res){
    let newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,(error,user)=>{
        if(error){
            console.log(error);
            return res.redirect('/auth/register')
        }
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/');
        })
    })
}


module.exports = createUser;
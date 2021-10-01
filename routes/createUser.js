const User = require('../models/user'),
passport   = require('passport')

function createUser (req,res){
    let newUser = new User({username:req.body.username, firstName:req.body.firstName});
    console.log(req.body)
    console.log(newUser)
    User.register(newUser,req.body.password,(error,user)=>{
        if(error){
            console.log(error);
            return res.redirect('/auth/register')
        }
        passport.authenticate('local')(req,res,()=>{
            console.log(user);
            res.redirect('/');
        })
    })
}


module.exports = createUser;
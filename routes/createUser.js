const   User = require('../models/user'),
        passport   = require('passport'),
        UserProfile  =   require('../models/userprofile');

function createUser (req,res){
    let newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,(error,user)=>{
        if(error){
            console.log(error);
            return res.redirect('/auth/register')
        }
        UserProfile.create(req.body,(err,created)=>{
            console.log(req.body);
                console.log(created)
        })
        passport.authenticate('local')(req,res,()=>{
          
            console.log(user);
            res.redirect('/');
        })
    })
}


module.exports = createUser;
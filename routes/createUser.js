const User = require('../models/user');

function createUser (req,res){
    User.create(req.body,(error,user)=>{
        if(error){
            console.log(error);
            return res.redirect('/auth/register')
        }
        res.redirect('/');
    })
}


module.exports = createUser;
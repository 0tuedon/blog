const User = require("../models/user");
const mongoose = require('mongoose');


async function verifyEmail (req,res){
try{
    const token = req.query.token  
    const user = await User.findOne({emailToken:token})
    if(user){
       
        user.emailToken = null
        user.isVerified = true
        console.log(user);
        user.save();
        res.render("emailverified");
    }
    else{
        res.redirect('/users/register')
      
    } 
}
catch {

} 
}

module.exports = verifyEmail;
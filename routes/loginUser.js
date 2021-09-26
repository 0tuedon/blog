const bcrypt        =       require('bcrypt'),
        User        =       require('../models/user');
const { reject } = require('bcrypt/promises');

function loginUser(req,res){
const {
    email,
    password
} = req.body

User.findOne({
    email
},(error,user)=>{
    if(error||!user){
        try{
        }
        catch(error){
                reject(error);
        }
        return res.redirect('/auth/login')
    }else{
        bcrypt.compare(password, user.password, (error,same)=>{
            console.log(password , user.password);
            if(password === user.password){
                req.session.UserId = user._id
                return res.redirect('/')
            } else {
                res.redirect('/auth/login')
            }
        })
    }
})
}

module.exports = loginUser
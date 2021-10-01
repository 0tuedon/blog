const  mongoose     =   require('mongoose');

    function authorizeUser(req,res,next){
        if(!req.user){
            res.redirect('/login')
        }
        else{
            if(req.user.username == 'mofe'  || req.user.username == 'Admin'){
                next();
            }
            else{
                res.redirect('/')
            }
        }
    }


    module.exports = authorizeUser
const Post = require('../models/post');
function homePage (req,res){
    res.locals.userDetails = req.user
    Post.find({},null,{sort:{date:-1}},(err,result)=>{
        if(err){

        }
        else{   
            console.log(req.user)
            res.render('index',{posts:result})
           
        }
    }).limit(2)


}


module.exports = homePage;
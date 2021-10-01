const Post = require('../models/post'),
        User = require('../models/user');
const user = require('../models/user');
function homePage (req,res){
    res.locals.userDetails = req.user
    Post.find({},null,{sort:{date:-1}},(err,result)=>{
        if(err){

        }
        else{   
         
          
           res.render('index',{posts:result})
            
           
        }
    }).limit(2)


}


module.exports = homePage;
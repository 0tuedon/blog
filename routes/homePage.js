const Post = require('../models/post');
function homePage (req,res){
    Post.find({},null,{sort:{date:-1}},(err,result)=>{
        if(err){

        }
        else{

            res.render('index',{posts:result})
           
        }
    }).limit(5)
   

}


module.exports = homePage;
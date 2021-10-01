const       mongoose        =   require('mongoose'),
            Comment         =   require('../models/comment'),
            Post            =   require('../models/post')


    function addNewComment(req,res){    
        let id = req.params.id
        
        let newComment = {message:req.body.message, username:req.user.username}
            
        Post.findById(id,(err,found)=>{
            Comment.create(newComment,(err,commentCreated)=>{
                if(err){
    
                }
                else{
                    found.comment.push(commentCreated);
                    found.save()
                    res.redirect('/post/'+id);
                }
            })

        })
      
    }


    module.exports = addNewComment;
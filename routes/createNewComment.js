const       mongoose        =   require('mongoose'),
            Comment         =   require('../models/comment'),
            Post            =   require('../models/post')


    function addNewComment(req,res){    
        let id = req.params.id
        console.log(req.body)
        let newComment = req.body.comment
        console.log(newComment)

        Post.findById(id,(err,found)=>{
            console.log(found)
            Comment.create(newComment,(err,commentCreated)=>{
                if(err){
    
                }
                else{
                    found.comment.push(commentCreated);
                    found.save()
                    console.log(found)
                    console.log(commentCreated);
                    res.redirect('/post/'+id);
                }
            })

        })
      
    }


    module.exports = addNewComment;
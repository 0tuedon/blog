const mongoose = require('mongoose'),
        Post   =  require('../models/post');


        function increaseLikes(req,res)
        {
            let id = {_id:req.body.postId},
                increaseLikes = {likes: 1},
                useridPush      =   {User:[{_id:req.user.id}]}
                if(req.user.id)
                {
                    Post.findOneAndUpdate(id,{$inc:increaseLikes},(err,foundUpdate)=>{
                    foundUpdate.push(useridPush);
                    foundUpdate.save();
                    console.log(foundUpdate);
                    })
                }
          
            res.redirect('/');
        }



    module.exports = increaseLikes;
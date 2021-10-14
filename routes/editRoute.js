const { reject } = require('bcrypt/promises');
const           Post            =   require('../models/post'),
                mongoose        =   require('mongoose');

function editRoute (req,res){
    let id = req.params.id,
        newBlog =   req.body
    
    Post.findByIdAndUpdate(id,newBlog,(err,updated)=>{
        try{
            console.log(newBlog)
            console.log(updated);
            res.redirect('/post/'+id)
        }
        catch(error){
            reject(error)
        }
        finally{
            console.log(updated);
        }
    })
}

module.exports = editRoute;
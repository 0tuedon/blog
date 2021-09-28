const       Post        =   require('../models/post');

async function deletePost(req,res){
    const id = req.params.id
    const deletePost =  Post.findByIdAndDelete(id,(err)=>{
        if(!err){
            res.redirect('/post/');
        }
    })
}




module.exports = deletePost;

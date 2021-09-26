function storePost(req,res,next){
    if(!req.files.image || !req.body.username || !req.body.title ||!req.body.description|| !req.body.content){
        res.redirect('/post/new');
    }
    next();
}


module.exports = storePost;
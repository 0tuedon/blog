const Post  = require('../models/post');


async function storePost(req,res) {
    const {
        image 
    } = req.files
    image.mv(path.resolve(__dirname,'public/posts', image.name),(error)=>{
    Post.create({
        ...req.body, 
        image:`/posts/${image.name}`},
        (error,post)=>{
            res.redirect('/')

        });
    })
}


module.exports = storePost;
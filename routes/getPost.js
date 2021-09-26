const       Post        =       require('../models/post');

async function getPost (req,res){
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
}


module.exports = getPost;
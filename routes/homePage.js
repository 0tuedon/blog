const Post = require('../models/post');
async function homePage (req,res){
    const posts = await Post.find({})
    res.render('index',{posts})

}

module.exports = homePage;
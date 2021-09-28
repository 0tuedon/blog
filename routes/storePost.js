const   Post  = require('../models/post'),
        mongoose    =   require('mongoose'),
        path        =   require('path'),
        fileUpload  =   require('express-fileupload')
async function storePost(req,res) {
    const {image} = req.files
    let blog =  req.body
    // Adding  the path to store the Image
    image.mv(path.resolve('public/posts',image.name),(error)=>{

        Post.create({ ...blog,image:`/posts/${image.name}`},(error,post)=>{
            
                if(!error){
                    return res.redirect('/')
                }
                else{
                    return console.log('error detected somewhere')
                }
    
            })
    })
    
    }

module.exports = storePost;
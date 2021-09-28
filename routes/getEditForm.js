const       Post     =   require('../models/post'),
            mongoose    =   require('mongoose')
module.exports = (req,res)=>{
const id = req.params.id
    Post.findById(id,(err,found)=>{
        try{
            res.render('edit',{post:found});
        }
        catch(error){
            console.log(error)
        }
        finally{
        }
        })
    }
  
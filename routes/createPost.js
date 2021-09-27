module.exports = (req,res)=>{
    if(req.sessions){
        return    res.render('create')
    }   
    else{
        res.render('create')
    }
    
 
}
const mongoose = require('mongoose'),
        User    =   require('../models/user'),
        UserProfile = require('../models/userprofile');

function findUserDetails(req,res){
    var id = req.params.id
    User.findById(id,(err,found)=>{
        if(err){

        }
        else{
            
        
        UserProfile.find({username:found.username},(err,foundOne)=>{
            if(err){

            }
            else{
            
              
                
              return  res.render('userDashboard.ejs',{profile:foundOne[0],user:found})
            }
          
        })
    }
    })
}


module.exports = findUserDetails;
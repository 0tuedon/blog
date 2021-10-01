const   mongoose  =   require('mongoose');
const ContactMessage = require('../models/contactmessage');

    

function storeContactMessage(req,res){
    let messageDetails = req.body.contact
    console.log(messageDetails);
    ContactMessage.create(messageDetails,(err,message)=>{
        if(err){

        }
        else{
            console.log(message);
            res.redirect('/contact')
        }
    })

}
module.exports = storeContactMessage;
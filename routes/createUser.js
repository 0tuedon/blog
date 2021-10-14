const { getMaxListeners } = require('process');
const   User = require('../models/user'),
        mongoose = require('mongoose'),
        passport   = require('passport'),
        nodemailer =    require('nodemailer'),
        crypto      =   require('crypto'),
        jwt         =   require('jsonwebtoken'),
        bcrypt      =   require('bcrypt'),
        template    =   require('../nodemailer/htmlmailTemp')
        UserProfile  =   require('../models/userprofile');
var transporter  = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.SMTPUSER,
        pass:process.env.SMTPPASS
    },
    tls:{
        rejectUnauthorized:false
    }
})

 async function createUser (req,res){
    try{
        const {username,email,password} = req.body
        const newUser = new User({ 
            username,
            email,
            password,
            emailToken:crypto.randomBytes(64).toString('hex'),
            isVerified:false
        })
        User.register(newUser,password,(error,user)=>{
            if(error){
                console.log(error);
                return res.redirect('/auth/register')
            }
        // Verification mail
        let mailOptions = {
                        from:`"Verify Your Email" <blogemut@gmail.com>`,
                        to:user.email,
                        subject:`Join EmutBlog Newsletter -Verify Your Email`,
                        html: `<h2> Hey ${user.username.toUpperCase()}!! Thanks for Creating a new Account with us</h2>
                                <h4>Please verify your email with us to contimue...</h4>
                                <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">
                                Verify your Email
                                </a>`
                    }
                    // Sending the mail
                transporter.sendMail(mailOptions,(err,info)=>{
                            err ? console.log(err):console.log("Email Sent")
        }   )
                passport.authenticate('local')(req,res,()=>{
                        console.log(user);
                        res.redirect('/');
                    })
                
        res.redirect('/login')
    })

}catch(e){
        console.log(e)
    }

}
    

//         console.log(req.body);
//         UserProfile.create(req.body,(err,created)=>{
            
//         })
//         passport.authenticate('local')(req,res,()=>{
          
//             console.log(user);
//             res.redirect('/');
//         })
//     })
// }

// const express = require('express'),
//         app   = express(),
//         template = require('./htmlemailtemp'),
//         account = require('./accountClass');
//         nodemailer = require('nodemailer');
//         "use strict";
        
        
module.exports = createUser
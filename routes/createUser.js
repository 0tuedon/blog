const { getMaxListeners } = require('process');
const   User = require('../models/user'),
        mongoose = require('mongoose'),
        passport   = require('passport'),
        nodemailer =    require('nodemailer'),
        crypto      =   require('crypto'),
        jwt         =   require('jsonwebtoken'),
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
                req.flash("error",`Username already Exist`)
                return res.redirect('/auth/register')
            }
        // Verification mail
        let mailOptions = {
                        from:`"Verify Your Email" <blogemut@gmail.com>`,
                        to:user.email,
                        subject:`Join EmutBlog Newsletter -Verify Your Email`,
                        html: `<h2> Hello ${user.username.toUpperCase()}</h2>
                                <p>You registered an account on EmutBlog</p>
                                <div>
                                <p> before being able to use your account you need to verify that this is your email address by clicking
                                <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">
                                Here
                                </a>
                                </p>
                                `
                
                    }
                    // Sending the mail
               transporter.sendMail(mailOptions,(err,info)=>{
                            if(err){
                                res.send("Could not verify user");
                            }
                            else{
                                    return res.render("awaitingverification")
                            }
                        })

        }   )
                

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
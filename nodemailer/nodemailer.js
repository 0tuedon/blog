const nodemailer = require('nodemailer'),
        template    =    require('./htmlmailTemp');

 function main(req,res) {
          
    let transporter = nodemailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com',
      requireTLS: true,
      port: 587,
      secure: false,
     
      auth: {
        user: process.env.SMTPUSER, // generated ethereal user
        pass: process.env.SMTPPASS // generated ethereal password
      },
    });
       // generated ethereal password
    // send mail with defined transport object
    transporter.sendMail({
      from:"Annoymous", // sender address
      to: req.body.email, // list of receivers
      subject: "HI This is a Message from me ✔", // Subject line
      text: "How are you doing i am using Javascript send you a message if you see this message text me.", // plain text body
      html: template, // html body
    });
  }

  module.exports = main; 
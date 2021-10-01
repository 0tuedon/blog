const mongoose  = require('mongoose'),
        contactMessageSchema = new mongoose.Schema({

            name:String,
            email:String,
            phone:String,
            message:String
        })


        module.exports = mongoose.model('ContactMessage',contactMessageSchema);
const { unique } = require('jquery');

const   bcrypt      =   require('bcrypt'),
        mongoose    =   require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose'),
        UserSchema  =   new mongoose.Schema({
            username:String,
            email:String,
            joined:String
        })
        UserSchema.plugin(passportLocalMongoose)

        
        
        module.exports = mongoose.model('User',UserSchema)
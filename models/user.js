

const   bcrypt      =   require('bcrypt'),
        mongoose    =   require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose'),
        UserSchema  =   new mongoose.Schema({
            username:String,
            userProfile:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserProfile'
            },
            posts:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Post'
            }]
            
        })
        UserSchema.plugin(passportLocalMongoose)

        
        
        module.exports = mongoose.model('User',UserSchema)
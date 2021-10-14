

const   bcrypt      =   require('bcrypt'),
        mongoose    =   require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose'),
        UserSchema  =   new mongoose.Schema({
            username:{
                type:String,
                lowercase:true,
                unique:true
            },
            email:{
                type:String,
                unique:true,
                required:true
            },
            emailToken:{
                type:String
        
            },
            isVerified:{
                type:Boolean
            },
            date:{
                type:Date,
                default:Date.no
            },
            password:{
                type:String,
                required:true
            },
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
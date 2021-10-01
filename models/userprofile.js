const   mongoose  =   require('mongoose'),
        UserProfileSchema = new mongoose.Schema({
            firstName:String,
            lastName:String,
            DOB:{type:Date},
            email:String
            
        });


        module.exports= mongoose.model('UserProfile', UserProfileSchema);
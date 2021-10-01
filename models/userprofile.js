const   mongoose  =   require('mongoose'),
        UserProfileSchema = new mongoose.Schema({
            firstName:String,
            lastName:String,
            DOB:{type:Date},
            email:String,
            username:{
                type:String,
                unique:true,
                lowercase:true
            }
            
        });


        module.exports= mongoose.model('UserProfile', UserProfileSchema);
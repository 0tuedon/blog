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
            },
            likeSchema:[{type:mongoose.Schema.Types.ObjectId, ref:'Like'}]
            
        });


        module.exports= mongoose.model('UserProfile', UserProfileSchema);
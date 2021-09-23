const   mongoose                =   require('mongoose'),

        PostSchema              =   new mongoose.Schema({
            title: String,
            description:String,
            content:String,
            date:{type:Date, default:Date.now},
            createdBy:String,
            likes:Number,
            comment:String,
        }),

        Post                    =   mongoose.model('Post',PostSchema);


        module.exports          =   Post;

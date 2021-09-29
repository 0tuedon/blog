const   mongoose                =   require('mongoose'),
        mongoosePaginate        =   require('mongoose-paginate-v2');

        PostSchema              =   new mongoose.Schema({
            title: String,
            description:String,
            content:String,
            date:{type:Date, default:Date.now},
            username:String,
            image:String,
            createdBy:String,
            likes:Number,
            comment:String,
        });


        PostSchema.plugin(mongoosePaginate);

        Post                    =   mongoose.model('Post',PostSchema);

        // Post.paginate(query,options)
        //     .then(result =>{})
        //     .catch(error=>{})

        module.exports          =   Post;


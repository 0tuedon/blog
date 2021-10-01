const   mongoose                =   require('mongoose'),
        mongoosePaginate        =   require('mongoose-paginate-v2');

        PostSchema              =   new mongoose.Schema({
            title: String,
            description:String,
            content:String,
            date:{type:Date, default:Date.now},
            image:String,
            createdBy:String,
            likes:Number,
            comment:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Comment'
            }],
            username:{
                type:String,
                lowercase:true
            }
        });


        PostSchema.plugin(mongoosePaginate);

        Post                    =   mongoose.model('Post',PostSchema);

        // Post.paginate(query,options)
        //     .then(result =>{})
        //     .catch(error=>{})

        module.exports          =   Post;


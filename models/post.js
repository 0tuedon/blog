const   mongoose                =   require('mongoose'),
        mongoosePaginate        =   require('mongoose-paginate-v2');

        PostSchema              =   new mongoose.Schema({
            title: String,
            description:String,
            content:String,
            date:{type:Date, default:Date.now},
            image:String,
            createdBy:String,
            likes:{type:Number,default:0},
            comment:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Comment'
            }],
            User:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
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


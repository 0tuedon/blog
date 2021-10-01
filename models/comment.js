const       mongoose     =   require('mongoose')

            CommentSchema = new mongoose.Schema({
                username:String,
                message:String,
                sentAt:{type:Date,default:Date.now}
            });


let    comment = mongoose.model('Comment', CommentSchema)


            module.exports = comment;

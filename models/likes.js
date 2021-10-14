const       mongoose     =   require('mongoose')

            LikeSchema = new mongoose.Schema({
                user:
                message:String,
                sentAt:{type:Date,default:Date.now}
            });

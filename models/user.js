const { unique } = require('jquery');

const   bcrypt      =   require('bcrypt'),
        mongoose    =   require('mongoose'),
        UserSchema  =   new mongoose.Schema({
            username: {
                type:String,
                required:true,
                unique:true
            },
            email: {
                type:String,
                required:true,
                unique:true
            },
            password: {
                type:String,
                required:true
            }
        })

        UserSchema.pre('save',(next)=>{
            const user = this
            
            bcrypt.hash(user.password,10,(error,encrypted)=>{
                user.password = encrypted
                next();
            })
        })

        module.exports = mongoose.model('User',UserSchema)
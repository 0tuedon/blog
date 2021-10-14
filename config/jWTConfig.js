const jwt = require('jsonwebtoken'),
        cookie = require('cookie-parser');

        const loginRequired = async (req,res,next)=>{
            const token =  await req.cookies['access-token']
            if(token){
                const validation = await jwt.verify(token, process.env.SECRETJWT)
                if(validation){
                    res.user = validation.id
                    next();
                }
                else{
                    console.log('token expired')
                }
            }
            else {
                console.log("Token Not Found")
                res.redirect('/login')
            }
        
        }


        module.exports = loginRequired;
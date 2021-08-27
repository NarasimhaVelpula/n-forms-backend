const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    const token=req.body.authToken
    if(token){
        const verified=jwt.verify(token,process.env.TOKEN_SECRET)
        if(verified){
            console.log(verified)
            req.user=verified
            console.log("req user",req.user)
            next();
        }
        else{
            res.status(401).send("invalid token")
        }
    }
    else{
        console.log("validation Failed")
        res.status(401).send('access denied')
    }
}
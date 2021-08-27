const router=require('express').Router();
const user=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//Validation


router.post('/register',async (req, res)=>{

    const EmailExists=await user.findOne({username: req.body.username})
    console.log(EmailExists)
    if(EmailExists) return res.status(400).send("Email already exists")

    //Hash Password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);


    //New user Creation
    const newuser= new user({
        username: req.body.username,
        password: hashedPassword
    });
    try{
        const savedUser=await newuser.save()
        res.status(200).send(savedUser)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
    
})

//Login
router.post('/login',async (req,res)=>{
    console.log("login here")
    const findEmail= await user.findOne({username:req.body.username})
    
    if(findEmail){
        //validating password
        const validPass=await bcrypt.compare(req.body.password,findEmail.password)
        console.log(validPass)
        if(validPass){
            const token=jwt.sign({id: findEmail._id},process.env.TOKEN_SECRET)
            res.header('auth-token',token)
            res.status(200).send({token})
        }
        else{
            res.status(403).send("user invalid")
        }
    }
    else{
        res.status(403).send("user invalid")
    }
})

module.exports=router;

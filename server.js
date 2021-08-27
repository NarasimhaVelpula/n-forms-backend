const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const router=require('./views/form')
const authRouter=require('./views/auth')

app.use(cors())
app.use(express.json())
app.use('/',router)
app.use('/api/auth',authRouter)



const PORT=process.env.PORT
const uri=process.env.DBCONNECTIONSTRING

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{app.listen(PORT,()=>{console.log("server running on port "+PORT)})})
    .catch((error)=>{console.log(error)});
mongoose.set('useFindAndModify',false);


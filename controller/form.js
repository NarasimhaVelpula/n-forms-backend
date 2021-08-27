const mongoose=require('mongoose')
const { create } = require('../models/forms')
const Form=require('../models/forms')
const User=require('../models/User')

const createForm=async (req,res)=>{
    let userId=req.user.id
    let defaultForm={
        title:"UnTitled",
        theme:"",
        questions:[
            {
            question:"Question",
            questionType:"MultipleChoice",
            options:["OptionHere"]
            }
        
    ],
    responses:[]
    }
    let newForm=new Form(defaultForm)
    console.log("create Form triggered")
    try{
        
       console.log(userId)
        let findUser=await User.findById(userId)
      
        const createdForm=await newForm.save()
        
        findUser.forms.push(createdForm._id)
        console.log(findUser)
        updatedUser=await User.findByIdAndUpdate(userId,findUser)
        res.status(200).send({id:createdForm._id})
    }
    catch(err){
        console.log(err)
        res.status(404).send(err)

    }
}

const updateForm=async(req,res)=>{
    
    
    let form = req.body.form;
    
    let formId=req.body.formId;
    
    try{
        let updatedForm=await Form.findByIdAndUpdate(formId,form)
        
        res.status(200).send(updatedForm)
    }
    catch(e){
        console.log(err);
        res.status(404).send("Form not ulpdated")
    }
        

}

const getForm=async(req,res)=>{
    
    let formId=req.body.formId;
   
    try{
        let form=await Form.findById(formId)
        res.status(200).send(form)
    }
    catch(e){
        console.log(e)
        res.status(404).send("fomr not found")
    }
}

const getUserForms=async(req,res)=>{
    let userId=req.user.id
    console.log("getUserFomrs")
    try{
    let findUser=await User.findById(userId)
    let formsData=[]
   
    for(form of findUser.forms){
        let findForm=await Form.findById(form)
        
        formsData.push({id:findForm._id,title:findForm.title})
    }
    
    res.status(200).send(formsData)
    }
    catch(e){
        console.log(e)
        res.status(404).send("fomr not found")
    }
}

const saveResponse=async(req,res)=>{
    console.log(req.body)
    let formId=req.body.formId
    let response=req.body.response

    let findForm=await Form.findById(formId)
    let responses=findForm.responses

    responses.push(response)
    let updateForm=await Form.findByIdAndUpdate(formId,findForm)
    res.status(200).send("Response Submited")

}

const getResponses=async(req,res)=>{
    console.log("get Response hitted")
    console.log("form Number",req.body.formId)
    const formId=req.body.formId
    try{
    let findForm=await Form.findById(formId)
    
    res.status(200).send(findForm)
    }
    catch(e){
        console.log(e);
        res.status(404).send("file not found")
    }

}


module.exports={createForm,updateForm,getForm,getUserForms,saveResponse,getResponses}
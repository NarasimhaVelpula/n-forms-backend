const express=require('express')
const {createForm,updateForm,getForm,getUserForms,saveResponse,getResponses} = require('../controller/form')
const router=express.Router()
const verify=require('./TokenValidation')

router.post('/createForm',verify,createForm)
router.post('/updateForm',verify,updateForm)
router.post('/getForm',getForm)
router.post('/getUserForms',verify,getUserForms)
router.post('/saveResponse',saveResponse)
router.post('/getResponses',verify,getResponses)


module.exports=router
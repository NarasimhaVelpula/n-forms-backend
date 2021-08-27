const mongoose=require('mongoose')

const form=mongoose.Schema({
    title:String,
    theme:String,
    questions:[{
        question: String,
        questionType: String,
        options:[String]
    }],
    responses:[]
})
module.exports=mongoose.model('Form',form)

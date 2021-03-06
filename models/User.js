const mongoose= require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    date: {
        type: Date,
        default: Date.now
    },
    forms:{
        type: [String],
        default: []
    }
});

module.exports= mongoose.model('User', userSchema)
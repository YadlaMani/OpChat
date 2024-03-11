const mongoose = require('mongoose');
//Connect website basic schema of the message
const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:100
    },
    created_at:{
        type:Date,
        required:true
    }



})
//To intialize the database
const Chat =mongoose.model("Chat",chatSchema);
module.exports=Chat;
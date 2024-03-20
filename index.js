//basic setup needed for every website
const express=require('express');
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const ExpressError=require("./ExpressError")
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const Chat=require('./models/chat.js');

main().then(()=>console.log('Working..'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://yadlamaniymn2005:ymn336699@cluster0.ituafhp.mongodb.net/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/',(req,res)=>{
    res.send("Working");
})
app.listen(8080,()=>{
    console.log("Sever is listening on port 8080");
})


function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}
//Index Route -to show all routes
app.get("/chats",asyncWrap(async (req,res)=>{
    
        let chats= await Chat.find();
   
    res.render("index.ejs",{chats});
    
}));
//New Route
app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404,"Page not found");
    res.render("new.ejs");
})
//Create Route to add the message into the chat
app.post("/chats",(req,res)=>{
    try{
        let {from,to,msg}=req.body;
    let newChat =new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    newChat.save().then(res=>{
        console.log("Chat was saved");
    }).catch(err=>{
        console.log(err);
    })
    res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
    
    

})
//show route
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
    
        let {id}=req.params;
    let chat =await Chat.findById(id);
    if(!chat) {
        next(new ExpressError(404,"Chat not found"));
    }
    res.render("edit.ejs",{chat});
    
    

}));
//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
    try{
        let {id}=req.params;
        let chat=await Chat.findById(id);
        res.render("edit.ejs",{chat});
    }
    catch(err){
        next(err);
    }
   
})
//Update Route
app.put("/chats/:id",async (req,res)=>{
    try{
        let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true,new:true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
    
});
//Delete Route
app.delete("/chats/:id",async (req,res)=>{
    try{
        let {id}=req.params;
    let deleteChat=await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
    
    
})
//Error handling middle ware
const handleValidationError = (err)=>{
    console.log("There was an validation error");
    console.dir(err.message);
    return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==='ValidationError'){
        err=handleValidationError(err);
    }
    next(err);
})
app.use((err,req,res,next)=>{
    let {status=500,message='Some error occured'}=err;
    res.status(status).send(message);
})


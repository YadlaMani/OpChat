const mongoose = require('mongoose');

const Chat=require('./models/chat.js');
main()
.then(()=>console.log('Working..'))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Connect');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
//to insert a message in chat
let sampleChats=[
    {
        from:"Mani",
        to:"Vagabound",
        msg:"Those who forgive are the bravist",
        created_at:new Date(),
    },
    {
        from:"Mink",
        to:"Luffy",
        msg:"Ninja is safe",
        created_at:new Date(),
    },
    {
        from:"Women",
        to:"Guy",
        msg:"Will you stay even if the rain comes",
        created_at:new Date(),

    },
    {
        from:"Silent girl",
        to:"Good boy",
        msg:"iiii llloooww u",
        created_at:new Date(),

    },
    {
        from:"Geto",
        to:"Gojo",
        msg:"Are you st are gojo or you are gojo because you are strong",
        created_at:new Date(),

    },
    {
        from:"Throkill",
        to:"Thorfin",
        msg:"There are no enimes",
        created_at:new Date(),
    }

]
Chat.insertMany(sampleChats);
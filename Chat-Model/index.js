// importing required packages
const express=require("express");
const path=require("path");
const app=express();
const methodOverride = require("method-override"); 
app.use(methodOverride("_method"));


// defining port 
let port=3000;
app.listen(port,()=>{
    console.log("App is Listening on port "+port);
});
 
// setting paths through middleware 
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"/views"));

// Database connection 

const mongoose = require('mongoose');
const Chat=require("./model/chats");

main()
.then((res)=>{
    console.log("Connection Successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chatting');
}

// let user1=new Chat({
//     from:"Anshik",
//     msg:"HEy,, How you Doing?",
//     to:"Anshul",
//     date: new Date()
//   }).save()
//   .then((res)=>{
//     console.log("Data inserted "+res);
//   })
//   .catch((err)=> console.log("Error occured while inserting "+err));

//Sample data bulk inserting
// Chat.insertMany([
//     {
//     from:"Aman",
//     msg:"Call me Quickly!!",
//     to:"Subham",
//     date: new Date()
//     },
//     {
//     from:"Aniket",
//     msg:"You want to order something?",
//     to:"Naman",
//     date: new Date()
//     },
//     {
//     from:"Sohail",
//     msg:"I am in the gym now",
//     to:"Rohit"
//     },
//     {
//     from:"Raushan",
//     msg:"Wake up dude!!",
//     to:"Sunny",
//     date: new Date()
//     }
   
// ])
//   .then((res)=>{
//     console.log("Data inserted "+res);
//   })
//   .catch((err)=> console.log("Error occured while inserting "+err));




// maine pagee route
app.get("/home",(req,res)=>{
    Chat.find()
    .then((result)=>{
    // console.log(result);
    res.render("home.ejs",{result});
  })
  .catch((err)=> console.log(err));
});


//Send your message route

app.get("/home/create",(req,res)=>{
res.render("create.ejs");
});

app.post("/home", async(req,res)=>{
    let {from,msg,to}=req.body;
    await new Chat({from:from,msg:msg,to:to}).save()
    .then((result)=>{
        console.log("This data inserted:"+result);
          res.redirect("/home");

    })
    .catch((err)=> console.log("Error occured while inserting "+err));

});

// update route
app.get("/home/:id/edit",async (req,res)=>{
    let {id}=req.params;
     await Chat.findById(id)
   .then((result)=>{
     res.render("edit.ejs",{result});
    })
    .catch((err)=> console.log("Error occured"+err));
   
});
app.patch("/home/:id/edit", async(req,res)=>{
   let {id}=req.params;
   let {msgbox}=req.body;

 await Chat.findByIdAndUpdate(id, { msg: msgbox,isEdited:true,date:new Date()})
 .then((result)=>{
     res.redirect("/home");
    })
    .catch((err)=> console.log("Error occured"+err));
});


//delete route
app.delete("/home/:id/delete", async(req,res)=>{
    let {id}=req.params;
   await Chat.findByIdAndDelete(id)
    .then((result)=>{
     res.redirect("/home");
    })
    .catch((err)=> console.log("Could not Delete"+err));
});
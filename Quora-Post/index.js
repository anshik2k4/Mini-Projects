const express=require("express");
const app=express();

let port =3000;

// defining paths
const path=require("path");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");

// importing uuid package for random unique id's
const { v4: uuidv4 } = require("uuid");

// port listening setup
app.listen(port,()=>{
    console.log("App is listening on port "+port);

});

let array =[
    {
    username:"Anshik",
    content:"A Content creater",
     id:uuidv4()
},
{
    username:"Naman",
    content:"A Video Gamer",
     id:uuidv4()
},
    {
    username:"Dravid",
    content:"A Proffessional Singer",
     id:uuidv4()
}
];
app.get("/posts",(req,res)=>{
   res.render("Quora.ejs",{array});

});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
    
}); 
app.post("/posts",(req,res)=>{
     let {username,content,}=req.body;
     let id=uuidv4();
     array.push({username,content,id});
    res.redirect("/posts");
    
}); 
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=array.find((p)=>{
       return p.id===id;
    });
      res.render("detail.ejs",{post});
});

// Creating a route for editing the existing post 
app.get("/posts/:id/edit",(req,res)=>{
     let {id}=req.params;
    let post=array.find((p)=>{
       return p.id===id;
    });
    res.render("edit.ejs",{post});
});
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.patch("/posts/:id",(req,res)=>{
    let newcontent=req.body.newcontent; // new jo humne text araea ke name ka naaam rkha hai whi yaha pe req.body .rkhenge 
    // ya fir 
    //let {newcontent}=req.body;
      let {id}=req.params;
    let post=array.find((p)=>{
       return p.id===id;
    });
    post.content=newcontent;
res.redirect("/posts/");

});

app.delete("/posts/:id/delete", (req, res) => {
  const { id } = req.params;

  // jis post ka id match na ho, unko rakh lo
  array = array.filter(p => p.id !== id);

  res.redirect("/posts");
});

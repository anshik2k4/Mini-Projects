const mysql=require("mysql2");
const {faker}=require("@faker-js/faker");


const connection=mysql.createConnection({
 host:'localhost',
  user: 'root',
    database: 'demo_app',
    password:"anshikkr@2006725"
});


//  let createRandomUser=()=> {
//   return [
//      faker.string.uuid(),
//      faker.internet.username(),
//      faker.internet.email(),
//      faker.internet.password(),
//   ];
// }

// let array=[];
// for(let i=0;i<100;i++){
//     array.push(createRandomUser());
// }

//   let q="INSERT INTO datauser (userid,username,email,password) VALUES ?";


//  try{
//  connection.query(q,[array],(err,res)=>{
   
//         if(err) throw err;
//         console.log(res);
//   });
//  }
//     catch(err){
//    console.log(err);
//     }
 


const express=require("express");
let app=express();
const path=require("path");

let port=3000;
app.set("view engine","ejs");

app.listen(port,()=>{
 console.log(`App is listening on port ${port}.`);
});


app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"/views"));


app.get("/home",(req,res)=>{
let total='SELECT count(userid) FROM datauser';
    try{
 connection.query(total,(err,result)=>{
   
        if(err) throw err;
        let users=result[0]["count(userid)"];
        res.render("home.ejs",{users});
  });
 }
    catch(err){
   console.log(err);
    }

});


app.get("/home/user",(req,res)=>{
    
let q='SELECT * FROM datauser';
    try{
 connection.query(q,(err,users)=>{
   
        if(err) throw err;
        res.render("show.ejs",{users});
  });
 }
    catch(err){
   console.log(err);
    }

});

app.get("/home/user/add",(req,res)=>{

    res.render("add.ejs");
});

app.post("/home/user",(req,res)=>{
    let {username:name,email:mail,password:pass}= req.body;
     let id= faker.string.uuid();
let details = "INSERT INTO datauser (userid,username,email,password) VALUES (?,?,?,?)";
 try{
connection.query(details,[id,name,mail,pass],(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.redirect("/home/user");
 });
 }
 catch(err){
    console.log(err);
 }
});








app.get("/home/user/:id",(req,res)=>{
    let {id}=req.params;
    let q='SELECT * FROM datauser WHERE userid=?';
    try{
 connection.query(q,[id],(err,users)=>{
   let info=users[0];
        if(err) throw err;
       res.render("edit.ejs",{info});
  });
 }
    catch(err){
   console.log(err);
    }
});

app.post("/home/user/:id",(req,res)=>{
  let {username:name,password:pass}=req.body;
  let {id}=req.params;
  let userpass= 'SELECT password FROM datauser WHERE userid=?';
  
  try{
    connection.query(userpass,[id],(err,result)=>{
      if(err) throw err;
      console.log("Form pass:", `"${pass}"`);
  console.log("DB pass: ", `"${result[0].password}"`);
      if(result[0].password!=pass){
        res.send("wrong password");
      }
      else{
        let q= 'UPDATE datauser SET username=? WHERE userid=?';
        try{
          connection.query(q,[name,id],(err,info)=>{
            if(err) throw err;
            res.redirect("/home/user");
          });
        }
        catch(err){
          console.log(err);
        }
      }
    });
  }
  catch(err){
    console.log(err);
  }
}); 

// delete route 



app.get("/home/user/:id/delete",(req,res)=>{
    let {id}=req.params;
    let q='SELECT * FROM datauser WHERE userid=?';
    try{
 connection.query(q,[id],(err,users)=>{
   let info=users[0];
        if(err) throw err;
       res.render("delete.ejs",{info});
  });
 }
    catch(err){
   console.log(err);
    }
});


app.post("/home/user/:id/delete",(req,res)=>{
  let {password:pass}=req.body;
  let {id}=req.params;
  let userpass= 'SELECT password FROM datauser WHERE userid=?';
  
  try{
    connection.query(userpass,[id],(err,result)=>{
      if(err) throw err;
      console.log("Form pass:", `"${pass}"`);
  console.log("DB pass: ", `"${result[0].password}"`);
      if(result[0].password!=pass){
        res.send("wrong password");
      }
      else{
       let q = 'DELETE FROM datauser WHERE userid = ?';
        try{
          connection.query(q,[id],(err,info)=>{
            if(err) throw err;
            res.redirect("/home/user");
          });
        }
        catch(err){
          console.log(err);
        }
      }
    });
  }
  catch(err){
    console.log(err);
  }
}); 
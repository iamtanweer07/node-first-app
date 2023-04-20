// const http = require("http")
// const gName = require("./features")

// import http from "http";
// import gName from "./features.js"

// import {gName2, gName3} from "./features.js"

// console.log(gName)
// console.log(gName2)
// console.log(gName3)
// import http from "http";
// import  {generateLovePercent}  from "./features.js";
// import { create } from "domain";
// import fs from "fs";
// import path from 'path';
// console.log(path.dirname("/home"))


// synchronous fs
// const home = fs.readFileSync('./index.html')


// const server = http.createServer((req,res) => {
//   console.log("server")
//   //  console.log(req.url)
//   console.log(req.method);


//   if(req.url === "/"){
//     res.end("<h1>Home Page</h1>");
//     // Async fs 
//     // fs.readFile("./index.html", (err, home) => {
//     //   res.end(home);
//     // })
   
//    }
//    else if(req.url === "/about"){
//     res.end(`<h1>love is ${generateLovePercent()}</h1>`);
//    }

//    else if(req.url === "/contact"){
//     res.end("<h1>Contact Page</h1>");
//    }
//    else{
//     res.end("<h1>Page Not Found</h1>")
//    }

// })


// server.listen(5000, () => {
//   console.log("Server is working now")
// })


// method - get - read
           // post - create
           // put - update
           // delete - delete


// Node Js Tutorial

// file based module import export

// const abc = {
//   average: (a,b) => {
//     console.log((a+b)/2)
//   },
//   percentage: (a,b) => {
//     console.log((a/2)*100)
//   }
// }

// module.exports = abc;


// building based 

// const fs = require("fs");
// asynchronous
// fs.readFile("./sample.txt", "utf-8", (err,data) => {
//    if(err){
//     throw err;
//    }
//    console.log(data)
// })
// console.log("i am first ")

// synchronous
// const fs = require("fs");

// const a = fs.readFileSync("./sample.txt","utf-8");
// console.log(a);
// console.log("i am first ")


// import

// const {readFileSync} = require("fs");

// const a = readFileSync("./sample.txt","utf-8");
// console.log(a);
// console.log("i am first ")


// const fs = require("fs");

// const a = "This is my write filessssssss"

// async
// fs.writeFile("./sample1.txt",a,() => {
//   console.log("written")
// });

// sync
// fs.writeFileSync("./sample1.txt", a)

// console.log("i am first")

// Path module

// const path = require("path");
// const pth = path.extname("/node/index.js");
// console.log(pth)

//  const pth = path.basename();
//  console.log(pth)

// console.log(path.basename)

// const a = path.join();
// console.log(a)

// os module

// const os = require("os");

// // console.log(os.hostname())
// console.log(os.totalmem())


// Third party node modules

// const pokemon = require("pokemon");
// console.log(pokemon.random())


// sever makess node js

// const http = require("http");
// const fs = require("fs")

// const PORT = 4500;
// const hostname = "localhost";
// const home = fs.readFileSync("./index.html","utf-8");


// const servers = http.createServer((req,res) => {
//   if(req.url === "/"){
//    return res.end(home)
//   }
//   else if(req.url === "/about"){
//    return res.end("<h1>About Page</h1>")
//   }
//   else if(req.url === "/contact"){
//    return res.end("<h1>Contact Page</h1>")

//   }else if(req.url === "/service"){
//    return res.end("<h1>Service Page</h1>")
//   }
//   else{
//    return res.end("<h1>Page Not Found</h1>")
//   }
  
// });



// servers.listen(4000, "localhost", () => {
//   console.log("Server is working on http://localhost:4000");
// });

// servers.listen(PORT, hostname, () => {
//   console.log(`Server is working on http://${hostname}:${PORT}`);
// });




// EXPRESSS

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
const app = express();


// database connections


// mongoose.connect("mongodb://127.0.0.1:27017/", {
//   dbName: "backend",
// }).then(() => {
//      console.log("DB Connected Successfully")
// }).catch((err) => {
//      console.log(err)
// })

// const  messageSchema = new mongoose.Schema({
//     name:String,
//     email:String
// });

// const Messge = new mongoose.model("Message", messageSchema)



mongoose.connect("mongodb://127.0.0.1:27017/Backend", {useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
     console.log("Connected to MongoDB Successfully")
}).catch((err) => {
     console.log(err)
})

// const messageSchema = new mongoose.Schema({
//   name:String,
//   email:String,
// });
const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
});

const User = new mongoose.model("User",userSchema);
// const Messge = new mongoose.model("Message",messageSchema);


// app.get("/getproducts", (req,res) => {
//   //  res.json({
//   //   success:true,
//   //   products:[]
//   //  });
//   res.status(400).send("Meri Marzi")
// });

// tempoary database
// const users =[]


// using midde ware
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


// setting up view engine
app.set("view engine","ejs")

// function 

const isAuthenticated = async (req,res,next) => {
  const {token} = req.cookies;

  if(token){

   const decoded = Jwt.verify(token,"fhgfhvgvbnv")
  //  console.log(decoded)
     req.user = await User.findById(decoded._id);
      next()
  }else{
    res.redirect("/login");
  }
}

// app.get("/", (req,res) => {
  
// const pathLocation = path.resolve();
// // res.sendFile(path.join(pathLocation, "./index.html"))
//      res.render("index", {name:"Abhishek singh"});

//     // res.sendFile("index");
// });


// login button
app.get("/", isAuthenticated, (req,res) => {
  // console.log(req.cookies);
  console.log(req.user)
  res.render("logout", {name:req.user.name})
 });

// login 
app.get("/login",(req,res) => {
  res.render("login")
 });


//  register
 app.get("/register",(req,res) => {
  res.render("register")
 });

 app.post("/login", async(req,res) => {
  const {email,password} = req.body;

   let user = await User.findOne({email});

   if(!user) return res.redirect("/register");

  //  const isMatch = user.password===password;
  const isMatch = await bcrypt.compare(password,user.password);

   if(!isMatch) return res.render("login", {email,message:"Incorrect Passord"});

   const token = Jwt.sign({_id:user._id},"fhgfhvgvbnv")

    res.cookie("token", token,{ 
    httpOnly:true,
    expires:new Date(Date.now() + 60*1000)
});

res.redirect("/");


 });

  


app.post("/register", async (req,res) => {
//  console.log(req.body)
 const {name,email,password} = req.body;

 let user = await User.findOne({email})
 if(user){
    return res.redirect("/login")
 }

 const hashedPassword = await bcrypt.hash(password,10)

  user =   await User.create({
  name,
  email,
  password:hashedPassword,
});

const token = Jwt.sign({_id:user._id},"fhgfhvgvbnv")
// console.log(token)

res.cookie("token", token,{
  httpOnly:true,
  expires:new Date(Date.now() + 60*1000)
});
res.redirect("/");

});

  
app.get("/logout", (req,res) => {
  res.cookie("token", "null",{
    httpOnly:true,
    expires:new Date(Date.now())
  });
  res.redirect("/");
});
  


// app.get("/add", async (req,res) => {
//  await  Messge.create({
//        name:"Abhishek2",
//        email:"sample2@gmail.com"
//    }); 
//    res.send("Nice");
// });
 

// app.get("/success", (req,res) => {
//    res.render("success");
// });
  



// app.post("/", (req,res) => {
//   // console.log(req.body)
//   users.push(
//     {
//       username:req.body.name,
//       email:req.body.email
//     }
//   )
//   // res.render("success");
//   res.redirect("/success");
// });



// app.post("/contact", (req,res) => {
//   users.push({username:req.body.name,email:req.body.email})
//   res.redirect("/success");
// });


// app.post("/contact", async (req,res) => {
//   // destructure
//    const {name, email} = req.body;
//  // key value same 
//    await  Messge.create({name,email})
//   // await  Messge.create({name: name,email: email})
//     res.redirect("/success");
// }); 


// app.get("/users", (req,res) => {
//   res.json(
//     {
//       users,
//     }
//   )
// });


app.listen(4500,() => {
  console.log("Server is Working")
})




// GIT AND GITHUB Commands

// git init
// git status
// 
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./db/connection.js");
const User=require("./db/user.js")
const SchoolInfo=require('./db/jobOpening.js')
const cors=require("cors")

//enable cors
app.use(cors());

//Middleware for parsing JSON
app.use(express.json());

//Signing Up
app.post('/signup',async(req,res)=>{
   try{
      const {fullname,phone,email,password}=req.body;
      // console.log(req.body);

      const user=new User({fullname,phone,email,password});
      await user.save();
      res.status(201).json({message:'Signed up successfully'});
   }
   catch(error){
      console.log("hello error");
      res.status(500).json({error:"Sign up failed"});
   }
})


//Login
app.post('/login',async(req,res)=>{
   try{
      const {email,password}=req.body;
      const user= await User.findOne({email});
      console.log(user);
      if(!user)
      {
         return res.status(401).json({message:"Email is not correct"});
      }

      if(user.password !== password)
      {
         return res.status(401).json({message:"Password is not correct"});
      } 

      res.status(200).json({message:"Login Successful",user});
   }
   catch(error){
      res.status(500).json({error:"Login failed"});
   }
})

//add job opening
app.post('/add_job',async(req,res)=>{
   try{
   
      const{school_name,job_openings,photo_url,location,contact}=req.body;
      const opening=new SchoolInfo({school_name,job_openings,photo_url,location,contact});
      await opening.save();
      // console.log(opening);
      res.status(200).json({
         job: opening,
         status: "200",
         message: "new job added successfully",
       });

   } catch(error){
      res.status(500).json({error:"error in adding job opening"});
   }
})

app.listen(port, () => {
   console.log("server is listening");
})
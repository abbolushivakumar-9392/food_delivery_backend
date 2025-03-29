//importing
const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')

//middlewave
const PORT=3000
const app=express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(
  ()=>console.log("DB connected successfuly....")
).catch(
  (err)=>console.log(err)
)
app.get('',async(req, res)=>{
  try{
      res.send("<h1 align='center'>welcome to the backend </h1>")
  }
  catch(err)
  {
    console.log(err)
  }
})
//api login
app.post('/login',async(req, res)=>{
  const {email, password}=req.body
  try{
    const user = await User.findOne ({email});
    if (!user || !(await bcrypt.compare(password,user.password)))
    {
      return res.status(400).json({message:"invalid credentials"})
    }
    res.json({message:"Login successful", username: user.username});
  } 
  catch(err)
  {
    console.log(err)
  }
})
//register
app.post('/register',async(req, res)=>{
  const { user, email, password}=req.body
  try{
    const hashPassword=await bcrypt.hash(password,10)
      const newUser = new User({user,email,password:hashPassword})
      await newUser.save()
      console.log("new user is registered successfull...")
      res.json({message: 'user created....'})
  }
  catch(err)
  {
    console.log(err)
  }
})

app.listen(PORT,(err)=>{
  if(err){
    console.log(err)
  }
    console.log("sever is running on port  | this is a server : "+PORT)
  })
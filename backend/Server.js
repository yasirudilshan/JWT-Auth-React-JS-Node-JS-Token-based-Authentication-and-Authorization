const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const User=require('./models/user.model')
const jwt=require('jsonwebtoken');

const app = express();
app.use(cors())
app.use(express.json())

app.use(express.json());

async function connect(){
    try{
        await mongoose.connect(process.env.uri);
        console.log("Connected to mongoDB");
    }
    catch(error){
        console.log(error);
    }
}

app.post('/api/register',async (req,res)=>{
    console.log(req.body)
    try {
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        res.json({status:'ok'})
    } catch (err) {
        console.log(err)
        // res.json({status:'error',err})
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body.email);
    
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {

            const token=jwt.sign({
                name:user.name,
                email:user.email
            },'secret123')


            console.log(token);
            res.json({ status:'ok', user:token});
            
        } else {
            console.log("User not found");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get('/api/dashboard', async (req, res) => {
    
    const token=req.headers['x-access-token']
    console.log("Login Token",token);
    
    try {
        const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        const user=await User.findOne({email:email})

        if(user){
            return res.json({ status:'ok' });
        }
        else{
            return res.json({ status:'error' });
        }
        
    } catch (error) {
        console.error("Error:", error);
        return res.json({ status:'error', error:'Invalid token' });
    }
});

app.get('/api/home',authenticate,(req,res)=>{

})


app.get('/api/about',authenticate,(req,res)=>{
    
})

function authenticate(req,res,next){
    const token=req.headers['x-access-token']
    console.log('About',token)
    if(token==null){
        return res.json({ status:'failed' });
        
    }
    else{

        try {
            const decoded=jwt.verify(token,'secret123')
            const email=decoded.email;
            const user=User.findOne({email:'email'})
            if(user){
                return res.json({ status:'ok' });
            }
            else{
                return res.json({ status:'Invalid token' });
            }
        } catch (error) {
            return res.json({ status:'Invalid token' });
        }


        // const decoded=jwt.verify(token,'secret123',(err)=>{
        //     // jwt.verify(token,'secret123',(err)=>{
        //     if(err) return res.json({ status:'failed' });
        //     const email=decoded.email;
        //     const user=User.findOne({email:'email'})
        //     if(user){
        //         res.json({ status:'ok' });
        //     }
        //     else{
        //         res.json({ status:'Invalid token' });
        //     }
        //     //res.json({ status:'ok' });
        // next()
        // })


    }
}

connect();

app.listen(8000,()=>{
    console.log("Server started at port 8000")
})



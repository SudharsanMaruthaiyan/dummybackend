const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
 }));

 app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
 }));

// mongoose  connection 
const mongoUrl = "mongodb+srv://sudharsan6078:123@cluster0.qvter.mongodb.net/";
mongoose.connect(mongoUrl);

const userSchema = new mongoose.Schema({
    name:String,
    age:Number
});

const User = mongoose.model('User', userSchema);

app.post("/", async (req,res)=>{
    const userData = new User(req.body);
    try{
        const saveUser = await userData.save();
        res.json({saveUser, message:"data stored"});
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
})

app.delete("/del", async (req,res)=>{
    const {age} = new User(req.body);
    try{
        const delData = await User.deleteOne();
        res.json(delData);
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})


app.get("/get", async (req,res)=>{

    try{
        const users = await User.find();
        res.json(users);
        console.log(users);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})


const port = 3000;
app.listen(port, ()=>{
    console.log("Server ready")
})
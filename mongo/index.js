const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User=require("./init.js");
async function main() {
    await (mongoose.connect('mongodb://127.0.0.1:27017/test'));

};
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for JSON data
const methodoverride = require('method-override');

app.use(methodoverride('_method'));

main().then((res) => {
    console.log("success");
})
    .catch((err) => {
        console.log(err);
    });


const user1=new User({
    name:"sahil",
    age:48,
});
let port=3000;
app.set("view engine","ejs");
app.listen(port,()=>{
    console.log("app is listening");
    
})
user1.save();
app.get("/", async (req,res)=>{
    const count= await User.countDocuments();
    res.render("home.ejs",{count});
});
app.get("/users", async (req,res)=>{
    let users= await User.find();
    
  res.render("show.ejs",{users});
    
});
app.get("/users/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/users",async(req,res)=>{
    let {name:newname,age}=req.body;
    User.insertOne({name:newname,age:age});
    res.redirect("/users");
});
app.get("/users/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let user= await User.findById(id);
    console.log(user);
    res.render("edit.ejs",{user});
});
app.patch("/users/:id",async (req,res)=>{
   let {id}=req.params;
   let{name,age}=req.body;
   await User.findByIdAndUpdate(id,{name:name,age:age},{runvalidators:true},{new:true});
    res.redirect("/users");
    
});
app.delete("/users/:id", async(req,res)=>{
    let {id}=req.params;
   await User.findByIdAndDelete(id);
    res.redirect("/users");
})
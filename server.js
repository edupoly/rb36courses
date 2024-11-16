var express = require("express");
var app = express();
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const Course = require("./models/course.model");
const User = require("./models/user.model")
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(__dirname+"/public"))
app.set("view engine","pug")

app.get("/enroll/:cid",(req,res)=>{
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){
        User.findOneAndUpdate({username:req.cookies.username},{$push:{courses:req.params.cid}})
        .then((d)=>{console.log(d)})
        .catch(err=>console.log(err))
    }).catch(function(){console.log("not connected")})
})

app.get("/",(req,res)=>{
    var details = {};
    if(req.cookies.username){
        details.username=req.cookies.username
        details.password=req.cookies.password
    }
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){
        Course.find({}).then((data)=>{
            details.courses = data;
            res.render("home",details)
        })
    }).catch(function(){console.log("not connected")})
})
app.post("/login",(req,res)=>{
    mongoose.connect("mongodb+srv://infoedupoly:edupoly83@cluster0.eitlw5l.mongodb.net/rb36?retryWrites=true&w=majority&appName=Cluster0")
    .then(function(){

        User.findOne({username:req.body.username,password:req.body.password})
        .then((data)=>{
            if(data){
                console.log(data)
                details={}
                details.username=data.username
                details.password=data.password

                res.cookie("username",data.username)
                res.cookie("password",data.password)
                Course.find({}).then((courses)=>{
                    details.courses = courses;
                    console.log(details.username)
                    
                })
                // res.send("HIHIH")
            }
            else{
                res.json({msg:'failed'})
            }
        })
        .catch(()=>{})
        
    }).catch(function(){console.log("not connected")})
})


app.listen(8989,()=>{console.log("server running on 8989")})
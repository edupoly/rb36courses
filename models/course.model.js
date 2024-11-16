var mongoose = require('mongoose');
var courseSchema = mongoose.Schema({
    title:String,
    duration:String,
    trainer:String,
    price:String,
    prerequesites:String,
    technologies:String,
    image:String
})
var Course = mongoose.model("Course",courseSchema)
module.exports=Course;